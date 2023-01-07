// todo: add highest question to keep track of where zeros should start for table. Maybe that part of the table can be faded as well.
import React, { useState, useEffect } from 'react'
import ScoreTable from './ScoreTable'
import ScoreBar from './ScoreBar'
import QuestionBar from './QuestionBar'
import TimeBar from './Time'
import MaterialSearch from './MaterialSearch'
import AlertBar from './AlertBar'
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
    const [division, setDivision] = useState('Junior')
    const [question, setQuestion] = useState(1)
    const [currentTime, setCurrentTime] = useState(0)
    const [quizTableData, setQuizTableData] = useState([])
    const [alerts, setAlerts] = useState([])

    const addAlert = (alert) => {
        setAlerts(prev => [alert, ...prev])
    }

    let initialQuizData = []

    for (let i = 1; i <= (division === 'Senior' ? 20 : 15); i++) {
        initialQuizData.push(
            {
                question: i,
                red1 : {
                    interruption: false,
                    correct: false,
                    error: false,
                    foul: false
                },
                red2 : {
                    interruption: false,
                    correct: false,
                    error: false,
                    foul: false
                },
                red3 : {
                    interruption: false,
                    correct: false,
                    error: false,
                    foul: false
                },
                red4 : {
                    interruption: false,
                    correct: false,
                    error: false,
                    foul: false
                },
                red5 : {
                    interruption: false,
                    correct: false,
                    error: false,
                    foul: false
                },
                yellow1 : {
                    interruption: false,
                    correct: false,
                    error: false,
                    foul: false
                },
                yellow2 : {
                    interruption: false,
                    correct: false,
                    error: false,
                    foul: false
                },
                yellow3 : {
                    interruption: false,
                    correct: false,
                    error: false,
                    foul: false
                },
                yellow4 : {
                    interruption: false,
                    correct: false,
                    error: false,
                    foul: false
                },
                yellow5 : {
                    interruption: false,
                    correct: false,
                    error: false,
                    foul: false
                }
            }
        )
    }

    useEffect(() => {
        setQuizTableData(initialQuizData)
    }, [])

    const renderScoreTable = () => {
        if (quizTableData !== []) {
            console.log('scoretable rendered')
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
            let value = newQuizTableData[(question - 1)][quizzer].correct ? false : true
            newQuizTableData[(question - 1)][quizzer].correct = value;
            setQuizTableData(newQuizTableData)
            checkNumericalWinner()
            checkQuizOut(quizzer)
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
        console.log(newQuizTableData)
    }

    const checkNumericalWinner = () => {
        if (question === 15) {
            if (calculateTeamScore(question, 'red', true) !== calculateTeamScore(question, 'yellow', true)) {
                addAlert(`We have a numerical winner!`)
                toast.info('We have a numerical winner!', toastOptions)
                return true
            } else {
                addAlert('It looks like we have a tie.')
                toast.info('It looks like we have a tie.', toastOptions)
                return false
            }
        }
    }

    const toastOptions = {
        position: 'bottom-left'
    }

    //check for quiz-out or error-out
    const checkQuizOut = (quizzer) => {
        let correctCount = 0
        let errorCount = 0
        let correctMax = division === 'Senior' ? 8 : 6
        let errorMax = 5
        //need to add foul-out
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
            addAlert(`${quizzer} has quizzed out!`)
            return {quizOut: true, errorOut: false}
        } else if (errorCount >= errorMax) {
            toast.error(`${quizzer} has errored out!`, toastOptions)
            addAlert(`${quizzer} has errored out!`)
            return {quizOut: false, errorOut: true}
        } else {
            return 'No quiz or error out yet'
        }
    }

    const addQuestionDecider = () => {
        let newQuizTableData = quizTableData.slice()
        if(question >= 15) {
            newQuizTableData.push(
                {
                    question: (question + 1),
                    red1 : {
                        interruption: false,
                        correct: false,
                        error: false,
                        foul: false
                    },
                    red2 : {
                        interruption: false,
                        correct: false,
                        error: false,
                        foul: false
                    },
                    red3 : {
                        interruption: false,
                        correct: false,
                        error: false,
                        foul: false
                    },
                    red4 : {
                        interruption: false,
                        correct: false,
                        error: false,
                        foul: false
                    },
                    red5 : {
                        interruption: false,
                        correct: false,
                        error: false,
                        foul: false
                    },
                    yellow1 : {
                        interruption: false,
                        correct: false,
                        error: false,
                        foul: false
                    },
                    yellow2 : {
                        interruption: false,
                        correct: false,
                        error: false,
                        foul: false
                    },
                    yellow3 : {
                        interruption: false,
                        correct: false,
                        error: false,
                        foul: false
                    },
                    yellow4 : {
                        interruption: false,
                        correct: false,
                        error: false,
                        foul: false
                    },
                    yellow5 : {
                        interruption: false,
                        correct: false,
                        error: false,
                        foul: false
                    }
                }
            )
            setQuizTableData(newQuizTableData)
        }
    }

    const handleQuestionChange = (direction) => {
        addQuestionDecider()
        if(direction === 'plus') {
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

    return (
        <div className='scorekeep-container'>
            <div className='scorekeep-div'>
                <div className='scoresheet-div'>
                    <ScoreBar rScore={calculateTeamScore(question, 'red', true)} yScore={calculateTeamScore(question, 'yellow', true)} handleCheckboxChange={handleCheckboxChange} handleNameChange={handleNameChange} quizTableData={quizTableData} question={question} handle30={handle30} handleClear={handleClear} redName={redName} yellowName={yellowName} red1Name={red1Name} red2Name={red2Name} red3Name={red3Name} red4Name={red4Name} red5Name={red5Name} yellow1Name={yellow1Name} yellow2Name={yellow2Name} yellow3Name={yellow3Name} yellow4Name={yellow4Name} yellow5Name={yellow5Name} />
                    <ScoreTable render={renderScoreTable} />
                </div>
                <div className='scoresheet-tools'>
                    <QuestionBar question={question} handleQuestionChange={handleQuestionChange} className='question-bar' />
                    <TimeBar currentTime={currentTime} handleClear={handleClear} handle5={handle5} handle30={handle30} handle60={handle60}/>
                    <AlertBar alerts={alerts} />
                    <MaterialSearch />
                </div>
            </div>
        </div>
    )
}

export default Scorekeeper