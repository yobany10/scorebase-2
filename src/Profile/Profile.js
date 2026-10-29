import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useLocalProfile } from './LocalProfileProvider'
import './Profile.css'

const Profile = () => {
    const { profile, updateDisplayName } = useLocalProfile()
    const [displayName, setDisplayName] = useState(profile?.displayName || '')
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        setDisplayName(profile?.displayName || '')
    }, [profile])

    const handleSubmit = async event => {
        event.preventDefault()
        setIsSubmitting(true)

        try {
            await updateDisplayName(displayName)
            toast.success('Your name has been updated.', { position: 'bottom-right' })
        } catch (submissionError) {
            toast.error(submissionError.message, { position: 'bottom-right' })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <main className='profile-page-container'>
            <form className='profile-form-container' onSubmit={handleSubmit}>
                <div>
                    <h1 className='profile-title'>Your Profile</h1>
                    <p className='profile-subtitle'>This name is stored only in this browser.</p>
                </div>
                <label className='profile-field'>
                    Your name
                    <input
                        autoComplete='name'
                        maxLength='80'
                        onChange={event => setDisplayName(event.target.value)}
                        type='text'
                        value={displayName}
                    />
                </label>
                <button className='primary-button' disabled={isSubmitting} type='submit'>
                    {isSubmitting ? 'Saving...' : 'Save name'}
                </button>
            </form>
        </main>
    )
}

export default Profile