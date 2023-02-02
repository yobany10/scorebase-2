import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {auth} from '../Firebase/config'
import {useAuthState} from 'react-firebase-hooks/auth'
import './Navbar.css'

const MainNavbar = () => {
    const navigate = useNavigate()
    const [user, loading] = useAuthState(auth)
    return (
        <>
        <nav className="navbar-div">
            <div className='navbar-div-content'>
                <Link to={'/'}>
                    <p className='navbar-logo gradient-bg-purple-blue'>ScoreBase</p>
                </Link>
                <div className='navbar-links-container'>
                    {!user && <p className='navbar-link navbar-login' onClick={() => navigate('/login')}>Login</p>}
                    {user && <p className='navbar-link navbar-dashboard' onClick={() => navigate('/dashboard')}>Dashboard</p>}
                    {user && <p className='navbar-link navbar-scorekeep' onClick={() => navigate('/scorekeeping')}>Scorekeep</p>}
                    {user && <img src={user.photoURL} className='navbar-user-avatar' referrerPolicy="no-referrer" />}
                </div>
            </div>
        </nav>
        </>
    )
}

export default MainNavbar