import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import QuizBuzzer from './QuizBuzzer'
import { useQuizBuzzerClient } from '../realtime/useQuizBuzzerClient'

jest.mock('../realtime/useQuizBuzzerClient', () => ({
  useQuizBuzzerClient: jest.fn()
}))

const roster = [
  { key: 'red1', label: 'R1', name: 'Alex Able', team: 'red' },
  { key: 'yellow2', label: 'Y2', name: 'Zoe Zebra', team: 'yellow' }
]

const baseBuzzer = {
  status: 'ready',
  error: '',
  roster,
  claimedSeats: [],
  round: { roundId: 'round-1', isLocked: false, winner: null },
  seat: '',
  claimPending: false,
  buzzPending: false,
  claimSeat: jest.fn(),
  buzz: jest.fn()
}

const renderBuzzer = () => render(
  <MemoryRouter initialEntries={['/buzz/invite-token']}>
    <Routes>
      <Route path='/buzz/:invite' element={<QuizBuzzer />} />
    </Routes>
  </MemoryRouter>
)

beforeEach(() => {
  jest.clearAllMocks()
})

test('lets a connected phone claim an available active seat', () => {
  useQuizBuzzerClient.mockReturnValue(baseBuzzer)
  renderBuzzer()

  userEvent.click(screen.getByRole('button', { name: /R1 Alex Able Available/i }))

  expect(baseBuzzer.claimSeat).toHaveBeenCalledWith('red1')
})

test('sends a buzz only while a claimed phone is ready', () => {
  useQuizBuzzerClient.mockReturnValue({ ...baseBuzzer, seat: 'red1' })
  renderBuzzer()

  userEvent.click(screen.getByRole('button', { name: 'BUZZ' }))

  expect(baseBuzzer.buzz).toHaveBeenCalledTimes(1)
})

test('locks the button after another quizzer wins the round', () => {
  useQuizBuzzerClient.mockReturnValue({
    ...baseBuzzer,
    seat: 'red1',
    round: { roundId: 'round-1', isLocked: true, winner: 'yellow2' }
  })
  renderBuzzer()

  expect(screen.getByRole('button', { name: 'Buzz locked' })).toBeDisabled()
  expect(screen.getByText('Another quizzer buzzed first.')).toBeInTheDocument()
})

test('shows the winning phone as the first buzz', () => {
  useQuizBuzzerClient.mockReturnValue({
    ...baseBuzzer,
    seat: 'red1',
    round: { roundId: 'round-1', isLocked: true, winner: 'red1' }
  })
  renderBuzzer()

  expect(screen.getByRole('button', { name: 'You buzzed first!' })).toBeDisabled()
  expect(screen.getByText('The host has your answer controls open.')).toBeInTheDocument()
})
