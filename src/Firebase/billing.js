import { httpsCallable } from 'firebase/functions'
import { functions } from './config'

const createCheckoutSession = async () => {
    const callable = httpsCallable(functions, 'createCheckoutSession')
    const response = await callable({})

    return response.data
}

const createBillingPortalSession = async () => {
    const callable = httpsCallable(functions, 'createBillingPortalSession')
    const response = await callable({})

    return response.data
}

export { createCheckoutSession, createBillingPortalSession }