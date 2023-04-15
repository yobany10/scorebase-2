import React from 'react'
import './QuestionBar.css'

const QuestionBar = props => {

    return (
        <div className='questionbar-div'>
            <button className='questionbar-button' type='button' onClick={(e) => {
                e.stopPropagation()
                props.setIsShownR1(false)
                props.setIsShownR2(false)
                props.setIsShownR3(false)
                props.setIsShownR4(false)
                props.setIsShownR5(false)
                props.setIsShownY1(false)
                props.setIsShownY2(false)
                props.setIsShownY3(false)
                props.setIsShownY4(false)
                props.setIsShownY5(false)
                props.handleQuestionChange('minus')}
            }
            >&lt;</button>
            <p className='questionbar-count'>Question: {props.question}</p>
            <button className='questionbar-button' type='button' onClick={(e) => {
                e.stopPropagation()
                props.setIsShownR1(false)
                props.setIsShownR2(false)
                props.setIsShownR3(false)
                props.setIsShownR4(false)
                props.setIsShownR5(false)
                props.setIsShownY1(false)
                props.setIsShownY2(false)
                props.setIsShownY3(false)
                props.setIsShownY4(false)
                props.setIsShownY5(false)
                props.handleQuestionChange('plus')}
            }
            >&gt;</button>
        </div>
    )
}

export default QuestionBar