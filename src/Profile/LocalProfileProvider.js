import { createContext, useContext, useEffect, useState } from 'react'
import { getProfile, saveProfile } from '../storage/scorebaseDb'

const LocalProfileContext = createContext(null)

const LocalProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let isMounted = true

        const loadProfile = async () => {
            const storedProfile = await getProfile()

            if (isMounted) {
                setProfile(storedProfile || null)
                setLoading(false)
            }
        }

        loadProfile()

        return () => {
            isMounted = false
        }
    }, [])

    const updateDisplayName = async (displayName) => {
        const updatedProfile = await saveProfile(displayName)
        setProfile(updatedProfile)
        return updatedProfile
    }

    return (
        <LocalProfileContext.Provider value={{ profile, loading, updateDisplayName }}>
            {children}
        </LocalProfileContext.Provider>
    )
}

const useLocalProfile = () => {
    const context = useContext(LocalProfileContext)

    if (!context) {
        throw new Error('useLocalProfile must be used within a LocalProfileProvider.')
    }

    return context
}

export { LocalProfileProvider, useLocalProfile }