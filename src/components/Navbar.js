import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {auth} from '../Firebase/config'
import {toast} from 'react-toastify'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown';
import {useAuthSubscription} from '../Auth/AuthSubscriptionProvider'
import './Navbar.css'

const MainNavbar = () => {
    const navigate = useNavigate()
    const { user, hasActiveSubscription } = useAuthSubscription()

    const toastConfig = {
        position: 'bottom-right'
    }

    const handleLogoutClick = () => {
        auth.signOut()
        toast.info('You have been signed out', toastConfig)
    }

    return (
        <>
        <nav className="navbar-div">
            <div className='navbar-div-content'>
                <Link to={'/'}>
                    <p className='navbar-logo gradient-bg-purple-blue'>ScoreBase</p>
                </Link>
                <div className='navbar-links-container'>
                    {!user && <p className='navbar-link navbar-login' onClick={() => navigate('/login')}>Login</p>}
                    {user && hasActiveSubscription && <p className='navbar-link navbar-scorekeep' onClick={() => navigate('/scorekeeping')}>Scorekeep</p>}
                    {user && hasActiveSubscription && <p className='navbar-link navbar-dashboard' onClick={() => navigate('/dashboard')}>Dashboard</p>}
                    {user && <p className='navbar-link navbar-dashboard' onClick={() => navigate('/billing')}>{hasActiveSubscription ? 'Billing' : 'Upgrade'}</p>}
                    {user &&
                        <DropdownButton className='navbar-user-dropdown-button' align='end' bsPrefix='navbar-user-dropdown-button' title={<img src={user.photoURL} className='navbar-user-avatar' alt={user.displayName || 'User avatar'} referrerPolicy="no-referrer" />}>
                            <Dropdown.Item onClick={() => navigate('/billing')}>{hasActiveSubscription ? 'Manage subscription' : 'Upgrade plan'}</Dropdown.Item>
                            <Dropdown.Item onClick={handleLogoutClick}>Logout</Dropdown.Item>
                        </DropdownButton>
                    }
                </div>
            </div>
        </nav>
        </>
    )
}

export default MainNavbar