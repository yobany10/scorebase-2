import './QuizItem.css'
import {TbTrash} from 'react-icons/tb'
import {useNavigate} from 'react-router-dom'
import { deleteQuiz } from '../storage/scorebaseDb'

const QuizItem = (props) => {

    const navigate = useNavigate()

    const handleQuizDelete = async (e) => {
        e.stopPropagation()
        await deleteQuiz(props.quiz.id)
        props.onDelete()
    }

    return (
        <div className='quiz-item-container' onClick={() => navigate(`/viewquiz/${props.quiz.id}`)}>
            <p className='quiz-item-name'>{props.quiz.name}</p>
            <p className='quiz-item-score'>{props.quiz.rScore} / {props.quiz.yScore}</p>
            <p className='quiz-item-division'>{props.quiz.division}</p>
            <div className='quiz-item-date-container'>
                <p className='quiz-item-date'>{new Date(props.quiz.savedAt).toLocaleDateString()}</p>
                <p className='quiz-item-time'>{new Date(props.quiz.savedAt).toLocaleTimeString('en-US')}</p>
            </div>
            <TbTrash className='quiz-item-delete-icon' onClick={(e) => handleQuizDelete(e)} />
        </div>
    )
}

export default QuizItem