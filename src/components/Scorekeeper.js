// todo: add highest question to keep track of where zeros should start for table. Maybe that part of the table can be faded as well.
import React, { useState, useEffect } from 'react'
import {collection, doc, addDoc, updateDoc, serverTimestamp} from 'firebase/firestore'
import {auth, db} from '../Firebase/config'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useNavigate} from 'react-router-dom'
import ToolBar from './ToolBar'
import ScoreTable from './ScoreTable'
import ScoreBar from './ScoreBar'
import QuestionBar from './QuestionBar'
import TimeBar from './Time'
import MaterialSearch from './MaterialSearch'
import NotesBar from './NotesBar'
import { toast } from 'react-toastify'

import './Scorekeeper.css'

const Scorekeeper = () => {
    const [redBonusStart, setRedBonusStart] = useState(true)
    const [yellowBonusStart, setYellowBonusStart] = useState(true)
    const [redName, setRedName] = useState('Red')
    const [yellowName, setYellowName] = useState('Yellow')
    const [red1Name, setRed1Name] = useState('R1')
    const [red2Name, setRed2Name] = useState('R2')
    const [red3Name, setRed3Name] = useState('R3')
    const [red4Name, setRed4Name] = useState('R4')
    const [red5Name, setRed5Name] = useState('R5')
    const [yellow1Name, setYellow1Name] = useState('Y1')
    const [yellow2Name, setYellow2Name] = useState('Y2')
    const [yellow3Name, setYellow3Name] = useState('Y3')
    const [yellow4Name, setYellow4Name] = useState('Y4')
    const [yellow5Name, setYellow5Name] = useState('Y5')
    const [division, setDivision] = useState('Senior')
    const [question, setQuestion] = useState(1)
    const [currentTime, setCurrentTime] = useState(0)
    const [quizTableData, setQuizTableData] = useState([])
    const [notes, setNotes] = useState([])
    const [searchList, setSearchList] = useState([])
    const [isSaved, setIsSaved] = useState(false)
    const [quizId, setQuizId] = useState(null)
    
    const [user, loading] = useAuthState(auth)

    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            return
        }
        if (loading) {
            return
        }
        if (!user) {
            navigate('/login')
        }
    },[user, loading])

    const handleResetQuiz = () => {
        setRedBonusStart(true)
        setYellowBonusStart(true)
        setRedName('Red')
        setYellowName('Yellow')
        setRed1Name('R1')
        setRed2Name('R2')
        setRed3Name('R3')
        setRed4Name('R4')
        setRed5Name('R5')
        setYellow1Name('Y1')
        setYellow2Name('Y2')
        setYellow3Name('Y3')
        setYellow4Name('Y4')
        setYellow5Name('Y5')
        setQuestion(1)
        setCurrentTime(0)
        setQuizTableData(initialQuizData)
        setNotes(initialNotesData)
        setSearchList(initialSearchListData)
    }

    useEffect(() => {
        handleResetQuiz()
    }, [division])

    let initialQuizData = []

    for (let i = 1; i <= (division === 'Senior' ? 20 : 15); i++) {
        initialQuizData.push(
            {
                question: i,
                red1 : {
                    interruption: false,
                    correct: false,
                    error: false,
                    foul: false,
                    quizOut: false
                },
                red2 : {
                    interruption: false,
                    correct: false,
                    error: false,
                    foul: false,
                    quizOut: false
                },
                red3 : {
                    interruption: false,
                    correct: false,
                    error: false,
                    foul: false,
                    quizOut: false
                },
                red4 : {
                    interruption: false,
                    correct: false,
                    error: false,
                    foul: false,
                    quizOut: false
                },
                red5 : {
                    interruption: false,
                    correct: false,
                    error: false,
                    foul: false,
                    quizOut: false
                },
                yellow1 : {
                    interruption: false,
                    correct: false,
                    error: false,
                    foul: false,
                    quizOut: false
                },
                yellow2 : {
                    interruption: false,
                    correct: false,
                    error: false,
                    foul: false,
                    quizOut: false
                },
                yellow3 : {
                    interruption: false,
                    correct: false,
                    error: false,
                    foul: false,
                    quizOut: false
                },
                yellow4 : {
                    interruption: false,
                    correct: false,
                    error: false,
                    foul: false,
                    quizOut: false
                },
                yellow5 : {
                    interruption: false,
                    correct: false,
                    error: false,
                    foul: false,
                    quizOut: false
                }
            }
        )
    }

    let initialNotesData = []

    for (let i = 1; i <= (division === 'Senior' ? 20 : 15); i++) {
        initialNotesData.push(
            {
                question: i,
                note: ''
            }
        )
    }

    let initialSearchListData = []

    for (let i = 1; i <= (division === 'Senior' ? 20 : 15); i++) {
        initialSearchListData.push(
            ''
        )
    }

    useEffect(() => {
        setQuizTableData(initialQuizData)
        setNotes(initialNotesData)
        setSearchList(initialSearchListData)
    }, [])

    const renderScoreTable = () => {
        if (quizTableData !== []) {
            return quizTableData.map((item) => {
                return <tr key={`${item.question}tr`} className={item.question === question ? 'highlight-row' : null} onClick={() => handleTableRowClick(item)}>
                            <td key={`${item.question}`} className='dark-cell'>{item.question}</td>
                            <td key={`${item.question}r1`}>{calculateQuizzerValue(item, 'red1')}{calculateQuizzerActions(item, 'red1')}</td>
                            <td key={`${item.question}r2`}>{calculateQuizzerValue(item, 'red2')}{calculateQuizzerActions(item, 'red2')}</td>
                            <td key={`${item.question}r3`}>{calculateQuizzerValue(item, 'red3')}{calculateQuizzerActions(item, 'red3')}</td>
                            <td key={`${item.question}r4`}>{calculateQuizzerValue(item, 'red4')}{calculateQuizzerActions(item, 'red4')}</td>
                            <td key={`${item.question}r5`}>{calculateQuizzerValue(item, 'red5')}{calculateQuizzerActions(item, 'red5')}</td>
                            <td key={`${item.question}teamr`} className='dark-cell'>{calculateTeamScore(item.question, 'red')}</td>
                            <td key={`${item.question}teamy`} className='dark-cell'>{calculateTeamScore(item.question, 'yellow')}</td>
                            <td key={`${item.question}y1`}>{calculateQuizzerValue(item, 'yellow1')}{calculateQuizzerActions(item, 'yellow1')}</td>
                            <td key={`${item.question}y2`}>{calculateQuizzerValue(item, 'yellow2')}{calculateQuizzerActions(item, 'yellow2')}</td>
                            <td key={`${item.question}y3`}>{calculateQuizzerValue(item, 'yellow3')}{calculateQuizzerActions(item, 'yellow3')}</td>
                            <td key={`${item.question}y4`}>{calculateQuizzerValue(item, 'yellow4')}{calculateQuizzerActions(item, 'yellow4')}</td>
                            <td key={`${item.question}y5`}>{calculateQuizzerValue(item, 'yellow5')}{calculateQuizzerActions(item, 'yellow5')}</td>
                        </tr>
            })
        }
        return (<tr>
            <td>1</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>10</td>
            <td>10</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
          </tr>)
      }

    useEffect(() => {
        renderScoreTable()
    })

    const calculateQuizzerActions = (item, quizzer) => {
        let actionCodes = ''
        let didRespond = false
        if (quizTableData.length !== 0) {
            if (item[quizzer].interruption) {
                didRespond = true
                actionCodes = actionCodes.concat('I')
            }
            if (item[quizzer].correct) {
                didRespond = true
                actionCodes = actionCodes.concat('C')
            }
            if (item[quizzer].error) {
                didRespond = true
                actionCodes = actionCodes.concat('E')
            }
            if (item[quizzer].foul) {
                didRespond = true
                actionCodes = actionCodes.concat('F')
            }
        }
        if (didRespond) {
            return <>
                {item[quizzer].interruption ? <sup className='quizzer-action-sup-i'>I</sup> : null}
                {item[quizzer].correct ? <sup className='quizzer-action-sup-c'>C</sup> : null}
                {item[quizzer].error ? <sup className='quizzer-action-sup-e'>E</sup> : null}
                {item[quizzer].foul ? <sup className='quizzer-action-sup-f'>F</sup> : null}
                </>
        }
    }

    const handleTableRowClick = (item) => {
        setQuestion(item.question)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            currentTime <= 0 ? clearInterval(interval) : setCurrentTime(currentTime - 1)
        }, 1000)
        return () => clearInterval(interval)
    },[currentTime])

    const handleClear = () => {
        setCurrentTime(0)
    }

    const handle5 = () => {
        setCurrentTime(5)
    }

    const handle30 = () => {
        setCurrentTime(30)
    }
    
    const handle60 = () => {
        setCurrentTime(60)
    }

    const calculateQuizzerValue = (item, quizzer) => {
        let question = item.question
        let value = 10
        let score = 0
        if (division === 'Senior') {
            question > 20 ? value = 20 : question > 17 && question <= 20 ? value = 30 : question <= 17 && question >= 9 ? value = 20 : value = 10;
        } else {
            question > 15 ? value = 20 : question > 12 && question <= 15 ? value = 30 : question <= 12 && question >= 7 ? value = 20 : value = 10;
        }
        if (item[quizzer].correct === true) {
            score = score + value
        }
        if (item[quizzer].error === true) {
            score = score - (value / 2)
        }
        if (item[quizzer].foul === true) {
            score = score - 5
        }
        if (item[quizzer].quizOut === true) {
            score = score + 10
        }
        return score
    }

    // (1, 'red', true)
    const calculateTeamScore = (question, team, total = false) => {
        let teamTotal = 0;
        if (total) {
            if (team === 'red') {
                quizTableData.forEach(item => {
                    teamTotal += calculateQuizzerValue(item, 'red1') + calculateQuizzerValue(item, 'red2') + calculateQuizzerValue(item, 'red3') + calculateQuizzerValue(item, 'red4') + calculateQuizzerValue(item, 'red5')
                })
            } else {
                quizTableData.forEach(item => {
                    teamTotal += calculateQuizzerValue(item, 'yellow1') + calculateQuizzerValue(item, 'yellow2') + calculateQuizzerValue(item, 'yellow3') + calculateQuizzerValue(item, 'yellow4') + calculateQuizzerValue(item, 'yellow5')
                })
            }
        } else {
            if (team === 'red') {
                quizTableData.forEach(item => {
                    if (item.question <= question) {
                        teamTotal += calculateQuizzerValue(item, 'red1') + calculateQuizzerValue(item, 'red2') + calculateQuizzerValue(item, 'red3') + calculateQuizzerValue(item, 'red4') + calculateQuizzerValue(item, 'red5')
                    }
                })
            } else {
                quizTableData.forEach(item => {
                    if (item.question <= question) {
                        teamTotal += calculateQuizzerValue(item, 'yellow1') + calculateQuizzerValue(item, 'yellow2') + calculateQuizzerValue(item, 'yellow3') + calculateQuizzerValue(item, 'yellow4') + calculateQuizzerValue(item, 'yellow5')
                    }
                })
            }
        }
        if(redBonusStart && team === 'red') {
            teamTotal += 10
        }
        if(yellowBonusStart && team === 'yellow') {
            teamTotal += 10
        }
        return teamTotal
    }

    const handleCheckboxChange = (event) => {
        // let value = event.target.checked
        let quizzer = event.target.id.split('-')[0]
        let answer = event.target.id.split('-')[1]
        let newQuizTableData = quizTableData.slice()
        if(answer === 'correct') {
            // Value variable checks what the checkbox was before clicking. It will equal what it now needs to be.
            let value = newQuizTableData[(question - 1)][quizzer].correct ? false : true
            newQuizTableData[(question - 1)][quizzer].correct = value;
            setQuizTableData(newQuizTableData)
            checkNumericalWinner()
            checkQuizOut(quizzer)
            if (newQuizTableData.filter(item => item[quizzer].correct == true).length > 7) {
                let newQuizTableData = quizTableData.slice()
                let value = newQuizTableData[question - 1][quizzer].quizOut ? false : true
                console.log(`the value is ${value}`)
                newQuizTableData[question - 1][quizzer].quizOut = value
                setQuizTableData(newQuizTableData, () => console.log(quizTableData))
            } else {
                let newQuizTableData = quizTableData.slice()
                newQuizTableData.forEach((item, index) => {
                newQuizTableData[index][quizzer].quizOut = false
                })
                setQuizTableData(newQuizTableData)
            }
            // If checkbox is now checked, do this.
            if(value) {
                addQuestionDecider()
                setQuestion(q => q + 1)
            }
        } else if (answer === 'error') {
            let value = newQuizTableData[(question - 1)][quizzer].error ? false : true
            newQuizTableData[(question - 1)][quizzer].error = value;
            setQuizTableData(newQuizTableData)
            checkNumericalWinner()
            checkQuizOut(quizzer)
            if(value) {
                addQuestionDecider()
                if(newQuizTableData[(question - 1)][quizzer].interruption === false) {
                    setQuestion(q => q + 1)
                }
            }
        } else if (answer === 'foul') {
            let value = newQuizTableData[(question - 1)][quizzer].foul ? false : true
            newQuizTableData[(question - 1)][quizzer].foul = value;
            setQuizTableData(newQuizTableData)
        } else {
            let value = newQuizTableData[(question - 1)][quizzer].interruption ? false : true
            newQuizTableData[(question - 1)][quizzer].interruption = value;
            setQuizTableData(newQuizTableData)
        }
    }

    const checkNumericalWinner = () => {
        let finalQuestion = division === 'Senior' ? 20 : 15
        if (question === finalQuestion) {
            if (calculateTeamScore(question, 'red', true) !== calculateTeamScore(question, 'yellow', true)) {
                toast.info('We have a numerical winner!', toastOptions)
                return true
            } else {
                toast.info('It looks like we have a tie.', toastOptions)
                return false
            }
        }
    }

    const toastOptions = {
        position: 'bottom-right'
    }

    //check for quiz-out or error-out
    const checkQuizOut = (quizzer) => {
        let correctCount = 0
        let errorCount = 0
        let correctMax = division === 'Senior' ? 8 : 6
        let errorMax = 5
        quizTableData.forEach(item => {
            if (item[quizzer].correct) {
                correctCount += 1
            }
            if (item[quizzer].error) {
                errorCount += 1
            }
        })
        if (correctCount >= correctMax) {
            toast.success(`${quizzer} has quizzed out!`, toastOptions)
            return {quizOut: true, errorOut: false}
        } else if (errorCount >= errorMax) {
            toast.error(`${quizzer} has errored out!`, toastOptions)
            return {quizOut: false, errorOut: true}
        } else {
            return 'No quiz or error out yet'
        }
    }

    const addQuestionDecider = (direction = 'plus') => {
        let newQuizTableData = quizTableData.slice()
        let newNotesData = notes.slice()
        let newSearchListData = searchList.slice()
        let finalQuestion = division === 'Senior' ? 20 : 15
        let questionCount = newQuizTableData.length
        console.log(`question:${question}, finalQuestions: ${finalQuestion}, questionCount: ${questionCount}, direction: ${direction}`)
        if(question >= finalQuestion && (question === questionCount) && direction == 'plus') {
            newNotesData.push(
                {
                    question: (question + 1),
                    note: ''
                }
            )
            newSearchListData.push('')
            newQuizTableData.push(
                {
                    question: (question + 1),
                    red1 : {
                        interruption: false,
                        correct: false,
                        error: false,
                        foul: false,
                        quizOut: false
                    },
                    red2 : {
                        interruption: false,
                        correct: false,
                        error: false,
                        foul: false,
                        quizOut: false
                    },
                    red3 : {
                        interruption: false,
                        correct: false,
                        error: false,
                        foul: false,
                        quizOut: false
                    },
                    red4 : {
                        interruption: false,
                        correct: false,
                        error: false,
                        foul: false,
                        quizOut: false
                    },
                    red5 : {
                        interruption: false,
                        correct: false,
                        error: false,
                        foul: false,
                        quizOut: false
                    },
                    yellow1 : {
                        interruption: false,
                        correct: false,
                        error: false,
                        foul: false,
                        quizOut: false
                    },
                    yellow2 : {
                        interruption: false,
                        correct: false,
                        error: false,
                        foul: false,
                        quizOut: false
                    },
                    yellow3 : {
                        interruption: false,
                        correct: false,
                        error: false,
                        foul: false,
                        quizOut: false
                    },
                    yellow4 : {
                        interruption: false,
                        correct: false,
                        error: false,
                        foul: false,
                        quizOut: false
                    },
                    yellow5 : {
                        interruption: false,
                        correct: false,
                        error: false,
                        foul: false,
                        quizOut: false
                    }
                }
            )
            console.log(newQuizTableData)
            setNotes(newNotesData)
            setSearchList(newSearchListData)
            setQuizTableData(newQuizTableData)
        }
    }

    const handleQuestionChange = (direction) => {
        addQuestionDecider(direction)
        if(direction === 'plus') {
            checkNumericalWinner()
            setQuestion(q => q + 1)
        } else {
            if(question > 1) {
                setQuestion(q => q - 1)
            }
        }
    }

    const handleNameChange = (side, name) => {
        if (side === 'red') {
            setRedName(name)
        } else {
            setYellowName(name)
        }
    }

    const handleSaveQuiz = async () => {
        if (isSaved) {
            try {
                const quizRef = doc(db, 'quizzes', quizId)
                const res = await updateDoc(quizRef, {
                    name: `${redName} vs ${yellowName}`,
                    redName: redName,
                    yellowName: yellowName,
                    quizTableData: quizTableData,
                    red1Name: red1Name,
                    red2Name: red2Name,
                    red3Name: red3Name,
                    red4Name: red4Name,
                    red5Name: red5Name,
                    yellow1Name: yellow1Name,
                    yellow2Name: yellow2Name,
                    yellow3Name: yellow3Name,
                    yellow4Name: yellow4Name,
                    yellow5Name: yellow5Name,
                    rScore: calculateTeamScore(question, 'red', true),
                    yScore: calculateTeamScore(question, 'yellow', true),
                    division: division,
                    notes: notes,
                    searchList: searchList,
                    saved: serverTimestamp()
                })
                setIsSaved(true)
                toast.success('Your quiz has been saved.', toastOptions)
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const quizzesRef = collection(db, 'quizzes')
                const res = await addDoc(quizzesRef, {
                    name: `${redName} vs ${yellowName}`,
                    redName: redName,
                    yellowName: yellowName,
                    quizTableData: quizTableData,
                    red1Name: red1Name,
                    red2Name: red2Name,
                    red3Name: red3Name,
                    red4Name: red4Name,
                    red5Name: red5Name,
                    yellow1Name: yellow1Name,
                    yellow2Name: yellow2Name,
                    yellow3Name: yellow3Name,
                    yellow4Name: yellow4Name,
                    yellow5Name: yellow5Name,
                    rScore: calculateTeamScore(question, 'red', true),
                    yScore: calculateTeamScore(question, 'yellow', true),
                    division: division,
                    notes: notes,
                    searchList: searchList,
                    user: user.uid,
                    avatar: user.photoURL,
                    username: user.displayName,
                    saved: serverTimestamp()
                })
                setIsSaved(true)
                setQuizId(res.id)
                toast.success('Your quiz has been saved.', toastOptions)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div className='scorekeep-bg'>
        <div className='scorekeep-container'>
            <ToolBar division={division} setDivision={setDivision} handleResetQuiz={handleResetQuiz} handleSaveQuiz={handleSaveQuiz} />
            <div className='scorekeep-div'>
                <div className='scoresheet-div'>
                    <ScoreBar rScore={calculateTeamScore(question, 'red', true)} yScore={calculateTeamScore(question, 'yellow', true)} handleCheckboxChange={handleCheckboxChange} handleNameChange={handleNameChange} quizTableData={quizTableData} question={question} handle30={handle30} handleClear={handleClear} redName={redName} yellowName={yellowName} red1Name={red1Name} red2Name={red2Name} red3Name={red3Name} red4Name={red4Name} red5Name={red5Name} yellow1Name={yellow1Name} yellow2Name={yellow2Name} yellow3Name={yellow3Name} yellow4Name={yellow4Name} yellow5Name={yellow5Name} />
                    <ScoreTable render={renderScoreTable} />
                </div>
                <div className='scoresheet-tools'>
                    <QuestionBar question={question} handleQuestionChange={handleQuestionChange} className='question-bar' />
                    <TimeBar currentTime={currentTime} handleClear={handleClear} handle5={handle5} handle30={handle30} handle60={handle60}/>
                    <NotesBar question={question} notes={notes} setNotes={setNotes} />
                    <MaterialSearch division={division} question={question} searchList={searchList} setSearchList={setSearchList} viewOnly={false} />
                </div>
            </div>
        </div>
        </div>
    )
}

export default Scorekeeper