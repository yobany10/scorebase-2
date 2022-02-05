import React from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'
import './TimeProgress.css'

const TimeProgress = props => {
    return (
        <div className='progressbar-div'>
            <ProgressBar animated now={props.time} variant='primary' max={60} />
        </div>
    )
}

export default TimeProgress