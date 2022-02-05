import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import './Navbar.css'

const MainNavbar = () => {
    return (
        <>
        <Navbar bg="light" className="navbar-div" sticky='top'>
            <Navbar.Brand className='navbar-brand'>ScoreBase</Navbar.Brand>
            {/* <Nav className="mr-auto navbar-link">
                <Link to='/'>Home</Link>
                <Link to='/scorekeep'>Scorekeep</Link>
            </Nav> */}
        </Navbar>
        </>
    )
}

export default MainNavbar