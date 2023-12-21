import React from 'react'
import ReactGA from 'react-ga4'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import TimeProgress from './TimeProgress'

import './Time.css'

const Time = props => {

    const handleTimeClick = (labelMessage, handleClick) => {
        ReactGA.event({
            category: "Scorekeeping - Timers",
            action: "Click",
            label: labelMessage,
        })
        handleClick()
    }
    
    return (
        <div className='timebar-div'>
            <p className='timebar-time-title'>Time: {props.currentTime}</p>
            <TimeProgress time={props.currentTime} />
            <ButtonGroup aria-label="Basic example">
                <Button variant="secondary" size='sm' onClick={() => handleTimeClick("Clear Time", props.handleClear)}>Clear</Button>
                <Button variant="secondary" size='sm' onClick={() => handleTimeClick("5 Second Timer", props.handle5)}>5</Button>
                <Button variant="secondary" size='sm' onClick={() => handleTimeClick("30 Second Timer", props.handle30)}>30</Button>
                <Button variant="secondary" size='sm' onClick={() => handleTimeClick("60 Second Timer", props.handle60)}>60</Button>
            </ButtonGroup>
        </div>
    )
}

export default Time