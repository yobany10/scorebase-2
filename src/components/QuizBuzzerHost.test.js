import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import QuizBuzzerHost from './QuizBuzzerHost'

const createBuzzer = overrides => ({
  status: 'idle',
  inviteUrl: '',
  error: '',
  connectedPeers: [],
  soundEnabled: true,
  session: {
    roster: [
      { key: 'red1', label: 'R1', name: 'Alex Able', team: 'red' },
      { key: 'yellow2', label: 'Y2', name: 'Zoe Zebra', team: 'yellow' }
    ],
    claimsBySeat: {},
    winner: null
  },
  enable: jest.fn(),
  stop: jest.fn(),
  reopen: jest.fn(),
  toggleSound: jest.fn(),
  ...overrides
})

test('does not render a host panel while phone buzzers are idle', () => {
  const { container } = render(<QuizBuzzerHost buzzer={createBuzzer()} />)

  expect(container).toBeEmptyDOMElement()
})

test('shows the share link, connected seats, and accepted winner', () => {
  const buzzer = createBuzzer({
    status: 'live',
    inviteUrl: 'https://scorebase.example/buzz/private-invite',
    connectedPeers: ['peer-red', 'peer-yellow'],
    session: {
      roster: [
        { key: 'red1', label: 'R1', name: 'Alex Able', team: 'red' },
        { key: 'red2', label: 'R2', name: 'Robin Red', team: 'red' },
        { key: 'yellow2', label: 'Y2', name: 'Zoe Zebra', team: 'yellow' }
      ],
      claimsBySeat: { red1: 'peer-red', yellow2: 'peer-yellow' },
      winner: { seat: 'yellow2', peerId: 'peer-yellow' }
    }
  })
  render(<QuizBuzzerHost buzzer={buzzer} />)

  expect(screen.getByLabelText('Phone join link')).toHaveValue(buzzer.inviteUrl)
  expect(screen.getByText('Y2 Zoe Zebra')).toBeInTheDocument()
  expect(screen.getByText('Open seat')).toBeInTheDocument()
  expect(screen.getByText(/buzzed first/)).toBeInTheDocument()

  userEvent.click(screen.getByRole('button', { name: 'Reopen buzzing' }))
  userEvent.click(screen.getByRole('button', { name: 'Mute buzzer sound' }))

  expect(buzzer.reopen).toHaveBeenCalledTimes(1)
  expect(buzzer.toggleSound).toHaveBeenCalledTimes(1)
  expect(screen.queryByRole('button', { name: 'Stop phone buzzers' })).not.toBeInTheDocument()
})
