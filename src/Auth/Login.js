import {useEffect} from 'react'
import {signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {auth} from '../Firebase/config'
import {useLocation, useNavigate} from 'react-router-dom'
import {FcGoogle} from 'react-icons/fc'
import {AiOutlineArrowDown} from 'react-icons/ai'
import {useAuthSubscription} from './AuthSubscriptionProvider'
import './Login.css'

const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { user, loading, hasActiveSubscription } = useAuthSubscription()
    const googleProvider = new GoogleAuthProvider()
    const redirectPath = location.state?.from?.pathname || '/scorekeeping'

    // Sign in with Google
    const GoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider)
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (loading) {
            return
        }

        if (!user) {
            return
        }

        navigate(hasActiveSubscription ? redirectPath : '/billing', { replace: true })
    },[user, loading, hasActiveSubscription, navigate, redirectPath])

    return (
        <div className='login-page-container'>
            <div className='login-options-container'>
                <div className='login-options-header'>
                    <h1 className='login-options-title'>Welcome!</h1>
                    <p className='login-options-subtitle'>Sign-in below to get started.</p>
                </div>
                <AiOutlineArrowDown className='login-arrow-down' />
                <button
                    className='login-provider-button navy-bg'
                    type='button'
                    onClick={GoogleLogin}>
                    <FcGoogle className='provider-google-icon' />
                    Sign in with Google
                </button>
            </div>
        </div>
    )
}

export default Login