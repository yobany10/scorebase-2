const admin = require('firebase-admin')
const Stripe = require('stripe')
const { logger } = require('firebase-functions')
const { defineSecret, defineString } = require('firebase-functions/params')
const { HttpsError, onCall, onRequest } = require('firebase-functions/v2/https')

admin.initializeApp()

const db = admin.firestore()
const stripeSecretKey = defineSecret('STRIPE_SECRET_KEY')
const stripeWebhookSecret = defineSecret('STRIPE_WEBHOOK_SECRET')
const stripeMonthlyPriceId = defineString('STRIPE_MONTHLY_PRICE_ID')
const appUrl = defineString('APP_URL')

const ACTIVE_SUBSCRIPTION_STATUSES = ['active', 'trialing']

const getStripeClient = () => new Stripe(stripeSecretKey.value())

const getUserRef = (uid) => db.collection('users').doc(uid)

const getOrCreateCustomer = async (stripe, auth) => {
  const userRef = getUserRef(auth.uid)
  const userSnapshot = await userRef.get()
  const userData = userSnapshot.exists ? userSnapshot.data() : null

  if (userData?.stripeCustomerId) {
    return {
      customerId: userData.stripeCustomerId,
      userRef,
      userData
    }
  }

  const customer = await stripe.customers.create({
    email: auth.token.email || undefined,
    name: auth.token.name || undefined,
    metadata: {
      firebaseUID: auth.uid
    }
  })

  await userRef.set(
    {
      email: auth.token.email || null,
      stripeCustomerId: customer.id,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    },
    { merge: true }
  )

  return {
    customerId: customer.id,
    userRef,
    userData: userSnapshot.exists ? userSnapshot.data() : null
  }
}

const syncSubscriptionState = async ({ uid, customerId, subscription }) => {
  const subscriptionItem = subscription.items?.data?.[0]

  await getUserRef(uid).set(
    {
      stripeCustomerId: customerId,
      subscriptionId: subscription.id,
      subscriptionStatus: subscription.status,
      subscriptionPriceId: subscriptionItem?.price?.id || null,
      subscriptionCurrentPeriodEnd: subscription.current_period_end
        ? admin.firestore.Timestamp.fromMillis(subscription.current_period_end * 1000)
        : null,
      hasActiveSubscription: ACTIVE_SUBSCRIPTION_STATUSES.includes(subscription.status),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    },
    { merge: true }
  )
}

const getUidForCustomer = async (stripe, customerId) => {
  const customer = await stripe.customers.retrieve(customerId)

  if (!customer.deleted && customer.metadata?.firebaseUID) {
    return customer.metadata.firebaseUID
  }

  const snapshot = await db.collection('users').where('stripeCustomerId', '==', customerId).limit(1).get()

  if (snapshot.empty) {
    throw new Error(`No Firebase user found for Stripe customer ${customerId}.`)
  }

  return snapshot.docs[0].id
}

exports.createCheckoutSession = onCall(
  { secrets: [stripeSecretKey] },
  async (request) => {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'You must be signed in to subscribe.')
    }

    const stripe = getStripeClient()
    const { customerId } = await getOrCreateCustomer(stripe, request.auth)
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: customerId,
      success_url: `${appUrl.value()}/billing`,
      cancel_url: `${appUrl.value()}/billing`,
      line_items: [
        {
          price: stripeMonthlyPriceId.value(),
          quantity: 1
        }
      ],
      allow_promotion_codes: false,
      client_reference_id: request.auth.uid,
      metadata: {
        firebaseUID: request.auth.uid
      }
    })

    return {
      url: session.url
    }
  }
)

exports.createBillingPortalSession = onCall(
  { secrets: [stripeSecretKey] },
  async (request) => {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'You must be signed in to manage billing.')
    }

    const stripe = getStripeClient()
    const { customerId } = await getOrCreateCustomer(stripe, request.auth)
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${appUrl.value()}/billing`
    })

    return {
      url: session.url
    }
  }
)

exports.stripeWebhook = onRequest(
  { secrets: [stripeSecretKey, stripeWebhookSecret] },
  async (request, response) => {
    if (request.method !== 'POST') {
      response.status(405).send('Method not allowed')
      return
    }

    const stripe = getStripeClient()
    let event

    try {
      event = stripe.webhooks.constructEvent(
        request.rawBody,
        request.headers['stripe-signature'],
        stripeWebhookSecret.value()
      )
    } catch (error) {
      logger.error('Stripe webhook verification failed.', error)
      response.status(400).send(`Webhook Error: ${error.message}`)
      return
    }

    try {
      switch (event.type) {
        case 'customer.subscription.created':
        case 'customer.subscription.updated':
        case 'customer.subscription.deleted': {
          const subscription = event.data.object
          const currentSubscription = await stripe.subscriptions.retrieve(subscription.id)
          const uid = await getUidForCustomer(stripe, currentSubscription.customer)
        
          await syncSubscriptionState({
            uid,
            customerId: currentSubscription.customer,
            subscription: currentSubscription
          })
          break
        }

        case 'checkout.session.completed': {
          const session = event.data.object

          if (session.mode === 'subscription' && session.subscription && session.customer) {
            const subscription = await stripe.subscriptions.retrieve(session.subscription)
            const uid = session.metadata?.firebaseUID || await getUidForCustomer(stripe, session.customer)

            await syncSubscriptionState({
              uid,
              customerId: session.customer,
              subscription
            })
          }
          break
        }

        default:
          logger.info(`Ignoring Stripe event ${event.type}.`)
      }

      response.json({ received: true })
    } catch (error) {
      logger.error('Stripe webhook handler failed.', error)
      response.status(500).send('Webhook handler failed')
    }
  }
)