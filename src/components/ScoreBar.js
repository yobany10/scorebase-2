import React, {useContext} from 'react'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Form from 'react-bootstrap/Form'
import {FaChevronDown} from 'react-icons/fa'
import {ActiveLineupContext} from './ActiveLineupContext'
import './ScoreBar.css'

const ScoreBar = props => {
  const activeLineup = useContext(ActiveLineupContext)
  const quizzerControls = {
    red1: { shown: props.isShownR1, setShown: props.setIsShownR1 },
    red2: { shown: props.isShownR2, setShown: props.setIsShownR2 },
    red3: { shown: props.isShownR3, setShown: props.setIsShownR3 },
    red4: { shown: props.isShownR4, setShown: props.setIsShownR4 },
    red5: { shown: props.isShownR5, setShown: props.setIsShownR5 },
    yellow1: { shown: props.isShownY1, setShown: props.setIsShownY1 },
    yellow2: { shown: props.isShownY2, setShown: props.setIsShownY2 },
    yellow3: { shown: props.isShownY3, setShown: props.setIsShownY3 },
    yellow4: { shown: props.isShownY4, setShown: props.setIsShownY4 },
    yellow5: { shown: props.isShownY5, setShown: props.setIsShownY5 }
  }

  const quizzerNames = {
    red1: props.red1Name,
    red2: props.red2Name,
    red3: props.red3Name,
    red4: props.red4Name,
    red5: props.red5Name,
    yellow1: props.yellow1Name,
    yellow2: props.yellow2Name,
    yellow3: props.yellow3Name,
    yellow4: props.yellow4Name,
    yellow5: props.yellow5Name
  }

  const getQuizzerLabel = (quizzer, seat, team) => {
    const nameParts = quizzerNames[quizzer].trim().split(/\s+/)
    const firstName = nameParts[0]
    const lastNameInitial = nameParts.length > 1 ? ` ${nameParts[nameParts.length - 1].charAt(0).toUpperCase()}` : ''
    const teamCode = team.charAt(0).toUpperCase()

    return (
      <span className='scorebar-quizzer-label'>
        <strong>{teamCode}{seat + 1}</strong>{` ${firstName}${lastNameInitial}`.trimEnd()}
      </span>
    )
  }

  const activeRedQuizzers = activeLineup ? (activeLineup.teamConfirmed.red ? activeLineup.activeRedQuizzers : ['red1', 'red2']) : ['red1', 'red2', 'red3']
  const activeYellowQuizzers = activeLineup ? (activeLineup.teamConfirmed.yellow ? activeLineup.activeYellowQuizzers : ['yellow1', 'yellow2']) : ['yellow1', 'yellow2', 'yellow3']

  const handleDropdownToggle = (isOpen, quizzer) => {
    if (isOpen && props.isPending === false) {
      props.handle30()
    }
    props.setIsPending(true)
    quizzerControls[quizzer].setShown(isOpen)
  }

  const handleAnswerChange = (event, quizzer, answer) => {
    const currentAnswer = props.quizTableData[props.question - 1][quizzer][answer]

    if ((answer === 'correct' || answer === 'error') && currentAnswer === false) {
      quizzerControls[quizzer].setShown(false)
      props.handleClear()
    }

    props.handleCheckboxChange(event)
    props.setIsPending(false)
  }

  const renderQuizzerMenu = (quizzer, seat, team) => {
    const quizzerData = props.quizTableData[props.question - 1]

    return (
      <DropdownButton
        as={ButtonGroup}
        key={quizzer}
        title={
          <>
            {getQuizzerLabel(quizzer, seat, team)}
            <FaChevronDown className='scorebar-dropdown-icon' aria-hidden='true' />
          </>
        }
        id={`${quizzer}-dropdown`}
        variant='secondary'
        show={quizzerControls[quizzer].shown}
        onToggle={(isOpen) => handleDropdownToggle(isOpen, quizzer)}
      >
        <Form>
          <div className='answer-checkbox'>
            {['interruption', 'correct', 'error', 'foul'].map(answer => (
              <Form.Check
                key={answer}
                type='checkbox'
                id={`${quizzer}-${answer}`}
                label={answer}
                checked={quizzerData === undefined ? false : quizzerData[quizzer][answer]}
                onChange={(event) => handleAnswerChange(event, quizzer, answer)}
              />
            ))}
          </div>
        </Form>
        <p className='dropdown-quizzer-name'>{quizzerNames[quizzer]}</p>
      </DropdownButton>
    )
  }

  return (
    <div className='scorebar-div'>
      <div className='scorebar-r-info-div'>
        <p className='scorebar-r-score'>{props.rScore}</p>
        <p className='scorebar-r-name'>{props.redName}</p>
      </div>
      {!props.viewOnly &&
        <ButtonGroup className='scorebar-r-actions'>
          {activeRedQuizzers.map((quizzer, seat) => renderQuizzerMenu(quizzer, seat, 'Red'))}
        </ButtonGroup>
      }
      {!props.viewOnly &&
        <ButtonGroup className='scorebar-y-actions'>
          {activeYellowQuizzers.map((quizzer, seat) => renderQuizzerMenu(quizzer, seat, 'Yellow'))}
        </ButtonGroup>
      }
      <div className='scorebar-y-info-div'>
        <p className='scorebar-y-score'>{props.yScore}</p>
        <p className='scorebar-y-name'>{props.yellowName}</p>
      </div>
    </div>
  )
}

export default ScoreBar