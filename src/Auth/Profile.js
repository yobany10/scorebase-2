import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuthSubscription } from './AuthSubscriptionProvider'
import { createBillingPortalSession, createCheckoutSession } from '../Firebase/billing'

const Profile = () => {
	const navigate = useNavigate()
	const { user, subscription, subscriptionLoading, hasActiveSubscription } = useAuthSubscription()
	const [isSubmitting, setIsSubmitting] = useState(false)

	const subscriptionStatus = subscription?.status || 'inactive'
	const subscriptionEndsAt = subscription?.currentPeriodEnd
		? new Date(subscription.currentPeriodEnd).toLocaleDateString()
		: null

	const handleCheckout = async () => {
		setIsSubmitting(true)

		try {
			const data = await createCheckoutSession()

			if (!data?.url) {
				throw new Error('Checkout session URL was not returned.')
			}

			window.location.assign(data.url)
		} catch (error) {
			toast.error(error.message || 'Unable to start checkout right now.')
			setIsSubmitting(false)
		}
	}

	const handlePortal = async () => {
		setIsSubmitting(true)

		try {
			const data = await createBillingPortalSession()

			if (!data?.url) {
				throw new Error('Billing portal URL was not returned.')
			}

			window.location.assign(data.url)
		} catch (error) {
			toast.error(error.message || 'Unable to open billing right now.')
			setIsSubmitting(false)
		}
	}

	return (
		<div className='container py-5'>
			<div className='row justify-content-center'>
				<div className='col-lg-8'>
					<div className='card shadow-sm border-0'>
						<div className='card-body p-4 p-md-5'>
							<p className='text-uppercase text-muted mb-2'>Account</p>
							<h1 className='h2 mb-3'>Subscription</h1>
							<p className='text-muted mb-4'>
								Manage the subscription that unlocks Scorekeeping and Dashboard access.
							</p>

							<div className='mb-4'>
								<p className='mb-1'><strong>Email:</strong> {user?.email || 'Unknown'}</p>
								<p className='mb-1'><strong>Status:</strong> {subscriptionLoading ? 'Checking access...' : subscriptionStatus}</p>
								{subscriptionEndsAt && <p className='mb-0'><strong>Renews through:</strong> {subscriptionEndsAt}</p>}
							</div>

							<div className='d-flex flex-wrap gap-3'>
								{!hasActiveSubscription &&
									<button
										type='button'
										className='btn btn-primary'
										disabled={isSubmitting || subscriptionLoading}
										onClick={handleCheckout}
									>
										Start monthly subscription
									</button>
								}
								{hasActiveSubscription &&
									<button
										type='button'
										className='btn btn-outline-primary'
										disabled={isSubmitting || subscriptionLoading}
										onClick={handlePortal}
									>
										Manage billing
									</button>
								}
								{hasActiveSubscription &&
									<button
										type='button'
										className='btn btn-link px-0'
										onClick={() => navigate('/scorekeeping')}
									>
										Continue to scorekeeping
									</button>
								}
							</div>

							<p className='text-muted small mt-4 mb-0'>
								Billing buttons will start working after the Stripe Cloud Functions and webhook are deployed.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Profile
