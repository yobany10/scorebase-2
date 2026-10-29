import { useState } from 'react'
import './QuizItem.css'
import {TbTrash} from 'react-icons/tb'
import {useNavigate} from 'react-router-dom'
import { deleteQuiz } from '../storage/scorebaseDb'
import DeleteConfirmationModal from './DeleteConfirmationModal'

const QuizItem = (props) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const navigate = useNavigate()

    const handleQuizDelete = async () => {
        await deleteQuiz(props.quiz.id)
        props.onDelete()
    }

    return (
        <>
            <div className='quiz-item-container' onClick={() => navigate(`/viewquiz/${props.quiz.id}`)}>
                <p className='quiz-item-name'>{props.quiz.name}</p>
                <p className='quiz-item-score'>{props.quiz.rScore} / {props.quiz.yScore}</p>
                <p className='quiz-item-division'>{props.quiz.division}</p>
                <div className='quiz-item-date-container'>
                    <p className='quiz-item-date'>{new Date(props.quiz.savedAt).toLocaleDateString()}</p>
                    <p className='quiz-item-time'>{new Date(props.quiz.savedAt).toLocaleTimeString('en-US')}</p>
                </div>
                <button type='button' className='quiz-item-delete-icon' aria-label={`Delete ${props.quiz.name}`} onClick={(event) => {
                    event.stopPropagation()
                    setShowDeleteModal(true)
                }}>
                    <TbTrash />
                </button>
            </div>
            <DeleteConfirmationModal
                show={showDeleteModal}
                onCancel={() => setShowDeleteModal(false)}
                onConfirm={handleQuizDelete}
            />
        </>
    )
}

export default QuizItem