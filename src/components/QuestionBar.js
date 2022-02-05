import React from 'react'
import './QuestionBar.css'

const QuestionBar = props => {
    return (
        <div className='questionbar-div'>
            <p>Question: {props.question}</p>
        </div>
    )
}

export default QuestionBar