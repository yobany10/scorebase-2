import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useLocalProfile } from './LocalProfileProvider'

const ProfileRoute = ({ children }) => {
    const location = useLocation()
    const { loading, profile } = useLocalProfile()

    if (loading) {
        return (
            <div className='container py-5'>
                <p className='text-center text-muted mb-0'>Loading your local profile...</p>
            </div>
        )
    }

    if (!profile?.displayName) {
        return <Navigate to='/welcome' replace state={{ from: location }} />
    }

    return children
}

export default ProfileRoute