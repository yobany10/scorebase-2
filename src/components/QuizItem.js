import './QuizItem.css'
import {TbTrash} from 'react-icons/tb'
import {useNavigate} from 'react-router-dom'
import {db} from '../Firebase/config'
import {doc, deleteDoc} from 'firebase/firestore'

const QuizItem = (props) => {

    const navigate = useNavigate()

    const handleQuizDelete = async (e) => {
        e.stopPropagation()
        await deleteDoc(doc(db, 'quizzes', props.quiz.id))
    }

    return (
        <div className='quiz-item-container' onClick={() => navigate(`/viewquiz/${props.quiz.id}`)}>
            <p className='quiz-item-name'>{props.quiz.name}</p>
            <p className='quiz-item-score'>{props.quiz.rScore} / {props.quiz.yScore}</p>
            <p className='quiz-item-division'>{props.quiz.division}</p>
            <div className='quiz-item-date-container'>
                <p className='quiz-item-date'>{new Date(props.quiz.saved.seconds * 1000).toLocaleDateString()}</p>
                <p className='quiz-item-time'>{new Date(props.quiz.saved.seconds * 1000).toLocaleTimeString('en-US')}</p>
            </div>
            <TbTrash className='quiz-item-delete-icon' onClick={(e) => handleQuizDelete(e)} />
        </div>
    )
}

export default QuizItem