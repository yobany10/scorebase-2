import React, { useState, useEffect } from 'react'
import {CgInsights} from 'react-icons/cg'
import './AlertBar.css'

const AlertBar = (props) => {

    return (
        <div className='alert-bar-container'>
            <h1 className='insights-title'><CgInsights/> Insights</h1>
            <div className='alert-bar'>
                {props.alerts.map((item, index) => {
                    return <p className='alert-bar-alert' key={index}>{item}</p>
                })}
            </div>
        </div>
    )
}

export default AlertBar