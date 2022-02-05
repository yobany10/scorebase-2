import React, { useState, useEffect } from 'react'
import ScoreTable from './ScoreTable'
import ScoreBar from './ScoreBar'
import QuestionBar from './QuestionBar'
import TimeBar from './Time'

import './Home.css'

const Home = () => {
    const [redScore, setRedScore] = useState(10)
    const [yellowScore, setYellowScore] = useState(10)
    const [question, setQuestion] = useState(1)
    const [currentTime, setCurrentTime] = useState(0)
    const [quizTable, setQuizTable] = useState([])

    useEffect(() => {
        setQuizTable([
            {
                question: 1,
                rscore: 0,
                yscore: 0,
                r1: 0,
                r2: 0,
                r3: 0,
                r4: 0,
                r5: 0,
                y1: 0,
                y2: 0,
                y3: 0,
                y4: 0,
                y5: 0
            },
            {
                question: 2,
                rscore: 0,
                yscore: 0,
                r1: 0,
                r2: 0,
                r3: 0,
                r4: 0,
                r5: 0,
                y1: 0,
                y2: 0,
                y3: 0,
                y4: 0,
                y5: 0
            },
            {
                question: 3,
                rscore: 0,
                yscore: 0,
                r1: 0,
                r2: 0,
                r3: 0,
                r4: 0,
                r5: 0,
                y1: 0,
                y2: 0,
                y3: 0,
                y4: 0,
                y5: 0
            },
            {
                question: 4,
                rscore: 0,
                yscore: 0,
                r1: 0,
                r2: 0,
                r3: 0,
                r4: 0,
                r5: 0,
                y1: 0,
                y2: 0,
                y3: 0,
                y4: 0,
                y5: 0
            },
            {
                question: 5,
                rscore: 0,
                yscore: 0,
                r1: 0,
                r2: 0,
                r3: 0,
                r4: 0,
                r5: 0,
                y1: 0,
                y2: 0,
                y3: 0,
                y4: 0,
                y5: 0
            },
            {
                question: 6,
                rscore: 0,
                yscore: 0,
                r1: 0,
                r2: 0,
                r3: 0,
                r4: 0,
                r5: 0,
                y1: 0,
                y2: 0,
                y3: 0,
                y4: 0,
                y5: 0
            },
            {
                question: 7,
                rscore: 0,
                yscore: 0,
                r1: 0,
                r2: 0,
                r3: 0,
                r4: 0,
                r5: 0,
                y1: 0,
                y2: 0,
                y3: 0,
                y4: 0,
                y5: 0
            },
            {
                question: 8,
                rscore: 0,
                yscore: 0,
                r1: 0,
                r2: 0,
                r3: 0,
                r4: 0,
                r5: 0,
                y1: 0,
                y2: 0,
                y3: 0,
                y4: 0,
                y5: 0
            },
            {
                question: 9,
                rscore: 0,
                yscore: 0,
                r1: 0,
                r2: 0,
                r3: 0,
                r4: 0,
                r5: 0,
                y1: 0,
                y2: 0,
                y3: 0,
                y4: 0,
                y5: 0
            },
            {
                question: 10,
                rscore: 0,
                yscore: 0,
                r1: 0,
                r2: 0,
                r3: 0,
                r4: 0,
                r5: 0,
                y1: 0,
                y2: 0,
                y3: 0,
                y4: 0,
                y5: 0
            },
            {
                question: 11,
                rscore: 0,
                yscore: 0,
                r1: 0,
                r2: 0,
                r3: 0,
                r4: 0,
                r5: 0,
                y1: 0,
                y2: 0,
                y3: 0,
                y4: 0,
                y5: 0
            },
            {
                question: 12,
                rscore: 0,
                yscore: 0,
                r1: 0,
                r2: 0,
                r3: 0,
                r4: 0,
                r5: 0,
                y1: 0,
                y2: 0,
                y3: 0,
                y4: 0,
                y5: 0
            },
            {
                question: 13,
                rscore: 0,
                yscore: 0,
                r1: 0,
                r2: 0,
                r3: 0,
                r4: 0,
                r5: 0,
                y1: 0,
                y2: 0,
                y3: 0,
                y4: 0,
                y5: 0
            },
            {
                question: 14,
                rscore: 0,
                yscore: 0,
                r1: 0,
                r2: 0,
                r3: 0,
                r4: 0,
                r5: 0,
                y1: 0,
                y2: 0,
                y3: 0,
                y4: 0,
                y5: 0
            },
            {
                question: 15,
                rscore: 0,
                yscore: 0,
                r1: 0,
                r2: 0,
                r3: 0,
                r4: 0,
                r5: 0,
                y1: 0,
                y2: 0,
                y3: 0,
                y4: 0,
                y5: 0
            },
            {
                question: 16,
                rscore: 0,
                yscore: 0,
                r1: 0,
                r2: 0,
                r3: 0,
                r4: 0,
                r5: 0,
                y1: 0,
                y2: 0,
                y3: 0,
                y4: 0,
                y5: 0
            },
            {
                question: 17,
                rscore: 0,
                yscore: 0,
                r1: 0,
                r2: 0,
                r3: 0,
                r4: 0,
                r5: 0,
                y1: 0,
                y2: 0,
                y3: 0,
                y4: 0,
                y5: 0
            },
            {
                question: 18,
                rscore: 0,
                yscore: 0,
                r1: 0,
                r2: 0,
                r3: 0,
                r4: 0,
                r5: 0,
                y1: 0,
                y2: 0,
                y3: 0,
                y4: 0,
                y5: 0
            },
            {
                question: 19,
                rscore: 0,
                yscore: 0,
                r1: 0,
                r2: 0,
                r3: 0,
                r4: 0,
                r5: 0,
                y1: 0,
                y2: 0,
                y3: 0,
                y4: 0,
                y5: 0
            },
            {
                question: 20,
                rscore: 0,
                yscore: 0,
                r1: 0,
                r2: 0,
                r3: 0,
                r4: 0,
                r5: 0,
                y1: 0,
                y2: 0,
                y3: 0,
                y4: 0,
                y5: 0
            },
            {
                question: 21,
                rscore: 0,
                yscore: 0,
                r1: 0,
                r2: 0,
                r3: 0,
                r4: 0,
                r5: 0,
                y1: 0,
                y2: 0,
                y3: 0,
                y4: 0,
                y5: 0
            },
            {
                question: 22,
                rscore: 0,
                yscore: 0,
                r1: 0,
                r2: 0,
                r3: 0,
                r4: 0,
                r5: 0,
                y1: 0,
                y2: 0,
                y3: 0,
                y4: 0,
                y5: 0
            },
            {
                question: 23,
                rscore: 0,
                yscore: 0,
                r1: 0,
                r2: 0,
                r3: 0,
                r4: 0,
                r5: 0,
                y1: 0,
                y2: 0,
                y3: 0,
                y4: 0,
                y5: 0
            }
        ])
    }, [])

    const renderScoreTable = () => {
        if (quizTable !== []) {
            return quizTable.map((item) => {
                return <tr>
                            <td>{item.question}</td>
                            <td>{item.r1}</td>
                            <td>{item.r2}</td>
                            <td>{item.r3}</td>
                            <td>{item.r4}</td>
                            <td>{item.r5}</td>
                            <td>{item.rscore}</td>
                            <td>{item.yscore}</td>
                            <td>{item.y1}</td>
                            <td>{item.y2}</td>
                            <td>{item.y3}</td>
                            <td>{item.y4}</td>
                            <td>{item.y5}</td>
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

    // const handleYellowPlus = event => {
    //     setYellowScore(yellowScore + questionValue(question))
    //     setQuestion(q => q + 1)
    // }

    // const handleRedMinus = event => {
    //     setRedScore(redScore - (questionValue(question) / 2))
    //     setQuestion(q => q + 1)
    // }

    // const handleYellowMinus = event => {
    //     setYellowScore(yellowScore - (questionValue(question) / 2))
    //     setQuestion(q => q + 1)
    // }

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

    const questionValue = (questionNum, answerStatus) => {
        let value;
        let appliedValue;
        questionNum > 20 ? value = 20 : questionNum > 17 && questionNum < 21 ? value = 30 : questionNum <= 17 && questionNum >= 9 ? value = 20 : value = 10
        if (answerStatus === 'C') {
            appliedValue = value
        } else if (answerStatus === 'E') {
            appliedValue = -(value / 2)
        } else {
            appliedValue = -5
        }
        return appliedValue
    }

    const handleQuizzerAction = (value) => {
        let chosenQuizzer = value.split('-')[0].toLowerCase()
        let chosenScoreColor = value.split('-')[2]
        let currentScore = chosenScoreColor === 'rscore' ? redScore : yellowScore
        let answerStatus = value.split('-')[1]
        // Set quizzer score value in table
        quizTable[(question - 1)][chosenQuizzer] += questionValue(question, answerStatus)
        // Set team score value in table
        if (chosenScoreColor === 'rscore') {
            setRedScore(redScore + questionValue(question, answerStatus))
            quizTable[(question - 1)]['rscore'] = (questionValue(question, answerStatus) + currentScore)
            quizTable[(question - 1)]['yscore'] = (yellowScore)
        } else {
            setYellowScore(yellowScore + questionValue(question, answerStatus))
            quizTable[(question - 1)]['yscore'] = (questionValue(question, answerStatus) + currentScore)
            quizTable[(question - 1)]['rscore'] = (redScore)
        }
        setQuestion(q => q + 1)
    }

    return (
        <div className='scorekeep-div'>
            <ScoreBar rScore={redScore} yScore={yellowScore} handleQuizzerAction={handleQuizzerAction} handle30={handle30} handleClear={handleClear} />
            <QuestionBar question={question} className='question-bar' />
            <TimeBar currentTime={currentTime} handleClear={handleClear} handle5={handle5} handle30={handle30} handle60={handle60}/>
            <ScoreTable redScore={redScore} yellowScore={yellowScore} render={renderScoreTable()} className='score-table'/>
        </div>
    )
}

export default Home