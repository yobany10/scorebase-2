import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLocalProfile } from './LocalProfileProvider'
import './Profile.css'

const NamePrompt = () => {
    const { profile, loading, updateDisplayName } = useLocalProfile()
    const [displayName, setDisplayName] = useState('')
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const redirectPath = location.state?.from?.pathname || '/scorekeeping'

    useEffect(() => {
        if (!loading && profile) {
            navigate(redirectPath, { replace: true })
        }
    }, [loading, navigate, profile, redirectPath])

    const handleSubmit = async event => {
        event.preventDefault()
        setError('')
        setIsSubmitting(true)

        try {
            await updateDisplayName(displayName)
            navigate(redirectPath, { replace: true })
        } catch (submissionError) {
            setError(submissionError.message)
            setIsSubmitting(false)
        }
    }

    if (loading || profile) {
        return null
    }

    return (
        <main className='profile-page-container'>
            <form className='profile-form-container' onSubmit={handleSubmit}>
                <div>
                    <h1 className='profile-title'>Welcome to ScoreBase</h1>
                    <p className='profile-subtitle'>What name should we use for this browser?</p>
                </div>
                <label className='profile-field'>
                    Your name
                    <input
                        autoComplete='name'
                        autoFocus
                        maxLength='80'
                        onChange={event => setDisplayName(event.target.value)}
                        type='text'
                        value={displayName}
                    />
                </label>
                {error && <p className='profile-error' role='alert'>{error}</p>}
                <button className='profile-submit-button' disabled={isSubmitting} type='submit'>
                    {isSubmitting ? 'Saving...' : 'Continue'}
                </button>
            </form>
        </main>
    )
}

export default NamePrompt