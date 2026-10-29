import {useEffect, useState} from 'react'
import QuizItem from './QuizItem'
import './Dashboard.css'
import noData from '../assets/svg/no-data.svg'
import { listQuizzes } from '../storage/scorebaseDb'

const Dashboard = () => {
    const [quizzes, setQuizzes] = useState([])

    useEffect(() => {
        let isMounted = true

        const loadQuizzes = async () => {
            const savedQuizzes = await listQuizzes(8)

            if (isMounted) {
                setQuizzes(savedQuizzes)
            }
        }

        loadQuizzes()

        return () => {
            isMounted = false
        }
    }, [])

    return (
        <div className='dashboard-page-container'>
            {/* <div className='dashboard-title-container'>
                <h1 className='dashboard-title'>Hello, {user.displayName.split(' ')[0]}!</h1>
                <p>Welcome to your dashboard. You can find your saved quizzes below!</p>
            </div> */}
            <div className='quizzes-container'>
                <h1 className='dashboard-title'>Saved Quizzes</h1>
                <p className='dashboard-info-subtitle'>{quizzes.length} quizzes</p>
                <div className='dashboard-quiz-list'>
                    {quizzes.map(item => {
                        return <QuizItem key={item.id} quiz={item} onDelete={() => setQuizzes(currentQuizzes => currentQuizzes.filter(quiz => quiz.id !== item.id))} />
                    })}
                </div>
                {quizzes.length < 1 &&
                <div className='dashboard-no-quizzes-container'>
                    <img src={noData} className='svg-lg' alt='No quizzes yet' />
                    <div className='dashboard-no-quizzes-text-container'>
                        <p className='dashboard-no-quizzes-title'>Nothing yet</p>
                        <p className='dashboard-no-quizzes-message'>Save quizzes and view them here later.</p>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}

export default Dashboard