import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthSubscription } from './AuthSubscriptionProvider'

const ProtectedRoute = ({ children, requireSubscription = false }) => {
    const location = useLocation()
    const { loading, isAuthenticated, hasActiveSubscription } = useAuthSubscription()

    if (loading) {
        return (
            <div className='container py-5'>
                <p className='text-center text-muted mb-0'>Checking account access...</p>
            </div>
        )
    }

    if (!isAuthenticated) {
        return <Navigate to='/login' replace state={{ from: location }} />
    }

    if (requireSubscription && !hasActiveSubscription) {
        return <Navigate to='/billing' replace state={{ from: location }} />
    }

    return children
}

export default ProtectedRoute