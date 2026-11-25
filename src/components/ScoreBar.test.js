import { useState } from 'react'
import { fireEvent, render } from '@testing-library/react'
import ScoreBar from './ScoreBar'

jest.mock('react-bootstrap/DropdownButton', () => ({
  __esModule: true,
  default: ({ children, show, title }) => <div>{title}{show && children}</div>
}))

const quizzerState = () => ({
  interruption: false,
  correct: false,
  error: false,
  foul: false,
  quizOut: false
})

const createQuizData = () => [{
  question: 1,
  red1: quizzerState(),
  red2: quizzerState(),
  red3: quizzerState(),
  red4: quizzerState(),
  red5: quizzerState(),
  yellow1: quizzerState(),
  yellow2: quizzerState(),
  yellow3: quizzerState(),
  yellow4: quizzerState(),
  yellow5: quizzerState()
}]

const scoreBarProps = {
  rScore: 10,
  yScore: 10,
  redName: 'Red',
  yellowName: 'Yellow',
  red1Name: 'Alex Able',
  red2Name: 'R2',
  red3Name: 'R3',
  red4Name: 'R4',
  red5Name: 'R5',
  yellow1Name: 'Y1',
  yellow2Name: 'Y2',
  yellow3Name: 'Y3',
  yellow4Name: 'Y4',
  yellow5Name: 'Y5',
  question: 1,
  quizTableData: createQuizData(),
  handleCheckboxChange: jest.fn(),
  handle30: jest.fn(),
  handleClear: jest.fn(),
  onActionResolved: jest.fn(),
  setIsPending: jest.fn(),
  isPending: false
}

const TestScoreBar = () => {
  const [isShownR1, setIsShownR1] = useState(true)
  const ignoredSetter = () => undefined
  return <ScoreBar
    {...scoreBarProps}
    isShownR1={isShownR1}
    setIsShownR1={setIsShownR1}
    isShownR2={false}
    setIsShownR2={ignoredSetter}
    isShownR3={false}
    setIsShownR3={ignoredSetter}
    isShownR4={false}
    setIsShownR4={ignoredSetter}
    isShownR5={false}
    setIsShownR5={ignoredSetter}
    isShownY1={false}
    setIsShownY1={ignoredSetter}
    isShownY2={false}
    setIsShownY2={ignoredSetter}
    isShownY3={false}
    setIsShownY3={ignoredSetter}
    isShownY4={false}
    setIsShownY4={ignoredSetter}
    isShownY5={false}
    setIsShownY5={ignoredSetter}
  />
}

beforeEach(() => {
  jest.clearAllMocks()
})

test('reopens phone buzzing after the host resolves a correct or error action', () => {
  render(<TestScoreBar />)

  const checkbox = document.querySelector('#red1-correct')
  fireEvent.click(checkbox)

  expect(scoreBarProps.handleClear).toHaveBeenCalledTimes(1)
  expect(scoreBarProps.onActionResolved).toHaveBeenCalledTimes(1)
  expect(scoreBarProps.handleCheckboxChange).toHaveBeenCalledTimes(1)
})
