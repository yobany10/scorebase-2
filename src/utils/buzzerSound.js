let audioContext = null

const getAudioContext = () => {
  if (!audioContext) {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) {
      return null
    }
    audioContext = new AudioContext()
  }
  return audioContext
}

export const primeBuzzerSound = async () => {
  const context = getAudioContext()
  if (!context) {
    return false
  }

  if (context.state === 'suspended') {
    await context.resume()
  }

  const oscillator = context.createOscillator()
  const gain = context.createGain()
  const now = context.currentTime
  gain.gain.setValueAtTime(0, now)
  oscillator.connect(gain)
  gain.connect(context.destination)
  oscillator.start(now)
  oscillator.stop(now + 0.01)
  return true
}

export const playBuzzerSound = () => {
  const context = getAudioContext()
  if (!context || context.state !== 'running') {
    return false
  }

  const startAt = context.currentTime
  const gain = context.createGain()
  gain.gain.setValueAtTime(0.0001, startAt)
  gain.gain.exponentialRampToValueAtTime(0.18, startAt + 0.01)
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.52)
  gain.connect(context.destination)

  ;[523.25, 659.25].forEach((frequency, index) => {
    const oscillator = context.createOscillator()
    oscillator.type = 'square'
    oscillator.frequency.setValueAtTime(frequency, startAt + index * 0.08)
    oscillator.connect(gain)
    oscillator.start(startAt + index * 0.08)
    oscillator.stop(startAt + 0.46)
  })

  return true
}
