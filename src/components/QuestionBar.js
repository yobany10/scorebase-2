import React from 'react'
import './QuestionBar.css'

const QuestionBar = props => {
    return (
        <div className='questionbar-div'>
            <button className='questionbar-button' type='button' onClick={() => props.handleQuestionChange('minus')}>&lt;</button>
            <p className='questionbar-count'>Question: {props.question}</p>
            <button className='questionbar-button' type='button' onClick={() => props.handleQuestionChange('plus')}>&gt;</button>
        </div>
    )
}

export default QuestionBar