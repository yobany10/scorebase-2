import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
    return (
        <div>
            <div className='full-page-banner'>
                <div id='full-page-banner-text-container'>
                    <h1 id='full-page-banner-text-small' className='facing-text'>Welcome To</h1>
                    <h1 id='full-page-banner-text-large' className='scale-in-ver-bottom gradient-bg-purple-blue'>ScoreBase</h1>
                </div>
                <Link to='/scorekeeping' id='full-page-banner-button-container'><button className='primary-button' id='full-page-banner-button'>Get Started</button></Link>
            </div>
        </div>
    )
}

export default Home