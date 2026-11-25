import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ToolBar from './ToolBar'

jest.mock('./TeamEditModal', () => () => <button type='button'>Substitution</button>)

const createProps = overrides => ({
  isSaving: false,
  handleNewQuiz: jest.fn(),
  handleClearQuiz: jest.fn(),
  handleSaveQuiz: jest.fn(),
  buzzerStatus: 'idle',
  enableBuzzer: jest.fn(),
  stopBuzzer: jest.fn(),
  ...overrides
})

test('enables phone buzzers from the toolbar', () => {
  const props = createProps()
  render(<ToolBar {...props} />)

  userEvent.click(screen.getByRole('button', { name: 'Enable phone buzzers' }))

  expect(props.enableBuzzer).toHaveBeenCalledTimes(1)
  expect(props.stopBuzzer).not.toHaveBeenCalled()
})

test('toggles the toolbar action to disconnect when buzzers are live', () => {
  const props = createProps({ buzzerStatus: 'live' })
  render(<ToolBar {...props} />)

  const disconnectButton = screen.getByRole('button', { name: 'Disconnect phone buzzers' })
  expect(disconnectButton).toHaveAttribute('aria-pressed', 'true')
  userEvent.click(disconnectButton)

  expect(props.stopBuzzer).toHaveBeenCalledTimes(1)
  expect(props.enableBuzzer).not.toHaveBeenCalled()
})
