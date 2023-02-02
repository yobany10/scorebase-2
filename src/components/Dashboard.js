import {useEffect, useState} from 'react'
import {auth, db} from '../Firebase/config'
import {collection, onSnapshot, where, query, orderBy, limit, serverTimestamp} from 'firebase/firestore'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useNavigate} from 'react-router-dom'
import QuizItem from './QuizItem'
import './Dashboard.css'

const Dashboard = (props) => {
    const [quizzes, setQuizzes] = useState([])
    const navigate = useNavigate()
    const [user, loading] = useAuthState(auth)

    const getQuizzes = async () => {
        console.log('getting quizzes')
        const q = query(collection(db, 'quizzes'), where('user', '==', `${user.uid}`), orderBy('saved', 'desc'), limit(8))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.docs.map(doc => console.log(doc.data()))
            setQuizzes(querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
        })
        return unsubscribe
    }

    // See if user is logged
    const checkAuth = async () => {
        if (user) {
            getQuizzes()
            return;
        }
        if (loading) return;
        if (!user) return navigate('/login')
    }

    useEffect(() => {
        checkAuth()
    },[user, loading])

    return (
        <div className='dashboard-page-container'>
            <div className='quizzes-container'>
                <h1 className='dashboard-title'>My quizzes</h1>
                <p className='dashboard-info-subtitle'>{quizzes.length} quizzes</p>
                <div className='dashboard-quiz-list'>
                    {quizzes != [] && quizzes.map(item => {
                        return <QuizItem key={item.id} quiz={item} />
                    })}
                </div>
                {/* <button className='primary-button' type='button'>See all</button> */}
            </div>
        </div>
    )
}

export default Dashboard