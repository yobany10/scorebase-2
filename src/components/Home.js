import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
    return (
        <div>
            <div className='full-page-banner'>
                <div id='full-page-banner-text-container'>
                    <h1 id='full-page-banner-text-large' className='flip-horizontal-bottom gradient-bg-purple-blue'>Scorekeeping made simple</h1>
                    <h1 id='full-page-banner-text-small'>Get started now with all the tools you need. It's easy!</h1>
                </div>
                <Link to='/scorekeeping' id='full-page-banner-button-container'><button className='info-button' id='full-page-banner-button'>Get Started</button></Link>
            </div>
            <div>
                <h1></h1>
            </div>
        </div>
    )
}

export default Home