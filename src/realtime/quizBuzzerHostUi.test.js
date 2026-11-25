import { applyAcceptedBuzzerBuzz } from './quizBuzzerHostUi'

test('opens only the winning scorebar and starts the host timer', () => {
  const controls = {
    red1: jest.fn(),
    red2: jest.fn(),
    yellow1: jest.fn(),
    yellow2: jest.fn()
  }
  const closeAll = jest.fn()
  const startTimer = jest.fn()
  const setPending = jest.fn()

  const handled = applyAcceptedBuzzerBuzz({
    seat: 'yellow2',
    controls,
    closeAll,
    startTimer,
    setPending
  })

  expect(handled).toBe(true)
  expect(closeAll).toHaveBeenCalledTimes(1)
  expect(controls.yellow2).toHaveBeenCalledWith(true)
  expect(controls.red1).not.toHaveBeenCalled()
  expect(controls.red2).not.toHaveBeenCalled()
  expect(controls.yellow1).not.toHaveBeenCalled()
  expect(startTimer).toHaveBeenCalledTimes(1)
  expect(setPending).toHaveBeenCalledWith(true)
})

test('ignores a buzz for a seat that is not active in the host UI', () => {
  const startTimer = jest.fn()

  expect(applyAcceptedBuzzerBuzz({
    seat: 'red5',
    controls: {},
    closeAll: jest.fn(),
    startTimer,
    setPending: jest.fn()
  })).toBe(false)
  expect(startTimer).not.toHaveBeenCalled()
})
