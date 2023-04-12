import QuizzerItem from './QuizzerItem'
import './QuizzersList.css'

const QuizzersList = (props) => {

    return (
        <div className='quizzers-list-div'>
            {props.quizzers.map(item => {
                return <QuizzerItem key={item.id} item={item} deleteQuizzer={props.deleteQuizzer} />
            })}
        </div>
    )
}

export default QuizzersList