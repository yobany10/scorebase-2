import {useEffect} from 'react'
import {signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {auth} from '../Firebase/config'
import {useNavigate} from 'react-router-dom'
import {useAuthState} from 'react-firebase-hooks/auth'
import {FcGoogle} from 'react-icons/fc'
import {AiOutlineArrowDown} from 'react-icons/ai'
import './Login.css'

const Login = () => {
    const navigate = useNavigate()
    const [user, loading] = useAuthState(auth)
    const googleProvider = new GoogleAuthProvider()

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
        if (user) {
            navigate('/scorekeeping')
        } else {
            return
        }
    },[user])

    return (
        <div className='login-page-container'>
            <div className='login-options-container scale-in-ver-bottom'>
                <div className='login-options-header'>
                    <h1 className='login-options-title'>Welcome!</h1>
                    <p className='login-options-subtitle'>Sign-in below to get started.</p>
                </div>
                <AiOutlineArrowDown className='login-arrow-down' />
                <button
                    className='login-provider-button'
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