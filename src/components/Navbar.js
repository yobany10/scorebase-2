import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {auth} from '../Firebase/config'
import {useAuthState} from 'react-firebase-hooks/auth'
import {toast} from 'react-toastify'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown';
import './Navbar.css'

const MainNavbar = () => {
    const navigate = useNavigate()
    const [user, loading] = useAuthState(auth)

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
                    {user && <p className='navbar-link navbar-scorekeep' onClick={() => navigate('/scorekeeping')}>Scorekeep</p>}
                    {user && <p className='navbar-link navbar-dashboard' onClick={() => navigate('/dashboard')}>Dashboard</p>}
                    {user &&
                        <DropdownButton className='navbar-user-dropdown-button' align='end' bsPrefix='navbar-user-dropdown-button' title={<img src={user.photoURL} className='navbar-user-avatar' referrerPolicy="no-referrer" />}>
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