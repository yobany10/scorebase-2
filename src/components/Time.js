import React from 'react'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import TimeProgress from './TimeProgress'

import './Time.css'

const Time = props => {
    return (
        <div className='timebar-div'>
            <p className='timebar-time-display'>Time: {props.currentTime}</p>
            <TimeProgress time={props.currentTime} />
            <ButtonGroup aria-label="Basic example">
                <Button variant="secondary" onClick={props.handleClear}>Clear</Button>
                <Button variant="secondary" onClick={props.handle5}>5</Button>
                <Button variant="secondary" onClick={props.handle30}>30</Button>
                <Button variant="secondary" onClick={props.handle60}>60</Button>
            </ButtonGroup>
        </div>
    )
}

export default Time