import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import './Navbar.css'

const MainNavbar = () => {
    return (
        <>
        <Navbar bg="light" className="navbar-div">
            <Link to={'/'}>
                <Navbar.Brand className='navbar-brand gradient-bg-purple-blue'>ScoreBase</Navbar.Brand>
            </Link>
            {/* <Nav className="mr-auto navbar-link">
                <Link to='/'>Home</Link>
                <Link to='/scorekeeping'>Scorekeep</Link>
            </Nav> */}
        </Navbar>
        </>
    )
}

export default MainNavbar