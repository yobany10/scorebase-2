import React, { createContext, useContext, useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../Firebase/config'

const AuthSubscriptionContext = createContext(null)

const ACTIVE_SUBSCRIPTION_STATUSES = ['active', 'trialing']

const normalizeCurrentPeriodEnd = (value) => {
    if (!value) {
        return null
    }

    if (typeof value?.toDate === 'function') {
        return value.toDate().toISOString()
    }

    if (typeof value === 'number') {
        return new Date(value).toISOString()
    }

    return value
}

const normalizeSubscription = (data) => {
    if (!data) {
        return {
            status: 'inactive',
            currentPeriodEnd: null,
            stripeCustomerId: null
        }
    }

    return {
        status: data.subscriptionStatus || data.status || 'inactive',
        currentPeriodEnd: normalizeCurrentPeriodEnd(data.subscriptionCurrentPeriodEnd || data.currentPeriodEnd),
        stripeCustomerId: data.stripeCustomerId || null
    }
}

const AuthSubscriptionProvider = ({ children }) => {
    const [user, authLoading] = useAuthState(auth)
    const [subscription, setSubscription] = useState(null)
    const [subscriptionLoading, setSubscriptionLoading] = useState(true)

    useEffect(() => {
        if (authLoading) {
            return
        }

        if (!user) {
            setSubscription(null)
            setSubscriptionLoading(false)
            return
        }

        setSubscriptionLoading(true)

        const unsubscribe = onSnapshot(
            doc(db, 'users', user.uid),
            (snapshot) => {
                setSubscription(normalizeSubscription(snapshot.exists() ? snapshot.data() : null))
                setSubscriptionLoading(false)
            },
            () => {
                setSubscription(normalizeSubscription(null))
                setSubscriptionLoading(false)
            }
        )

        return () => unsubscribe()
    }, [user, authLoading])

    const hasActiveSubscription = Boolean(
        user && ACTIVE_SUBSCRIPTION_STATUSES.includes(subscription?.status)
    )

    return (
        <AuthSubscriptionContext.Provider
            value={{
                user,
                subscription,
                authLoading,
                subscriptionLoading,
                loading: authLoading || subscriptionLoading,
                isAuthenticated: Boolean(user),
                hasActiveSubscription
            }}
        >
            {children}
        </AuthSubscriptionContext.Provider>
    )
}

const useAuthSubscription = () => {
    const context = useContext(AuthSubscriptionContext)

    if (!context) {
        throw new Error('useAuthSubscription must be used within an AuthSubscriptionProvider.')
    }

    return context
}

export { AuthSubscriptionProvider, useAuthSubscription }