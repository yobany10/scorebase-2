import React from 'react'
import { Link } from 'react-router-dom'
import { useLocalProfile } from '../Profile/LocalProfileProvider'
import './Navbar.css'

const MainNavbar = () => {
    const { profile } = useLocalProfile()

    return (
        <>
        <nav className="navbar-div">
            <div className='navbar-div-content'>
                <Link to={'/'}>
                    <p className='navbar-logo'>ScoreBase</p>
                </Link>
                <div className='navbar-links-container'>
                    {profile && <Link className='navbar-link navbar-scorekeep' to='/scorekeeping'>Scorekeep</Link>}
                    {profile && <Link className='navbar-link navbar-dashboard' to='/dashboard'>Dashboard</Link>}
                    {profile && <Link className='navbar-link navbar-profile' to='/profile'>{profile.displayName}</Link>}
                    {!profile && <Link className='navbar-link navbar-login' to='/welcome'>Get started</Link>}
                </div>
            </div>
        </nav>
        </>
    )
}

export default MainNavbar