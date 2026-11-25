import { useParams } from 'react-router-dom'
import { FaBolt, FaCheckCircle, FaWifi } from 'react-icons/fa'
import { useQuizBuzzerClient } from '../realtime/useQuizBuzzerClient'
import './QuizBuzzer.css'

const QuizBuzzer = () => {
  const { invite } = useParams()
  const buzzer = useQuizBuzzerClient(invite)
  const selectedSeat = buzzer.roster.find(item => item.key === buzzer.seat)
  const hasWon = buzzer.seat && buzzer.round.winner === buzzer.seat
  const isReady = buzzer.status === 'ready' && !buzzer.round.isLocked && !buzzer.buzzPending

  const buttonLabel = (() => {
    if (buzzer.status === 'host-offline') return 'Host offline'
    if (buzzer.buzzPending) return 'Sending...'
    if (hasWon) return 'You buzzed first!'
    if (buzzer.round.isLocked) return 'Buzz locked'
    if (buzzer.status !== 'ready') return 'Connecting...'
    return 'BUZZ'
  })()

  return (
    <main className={`phone-buzzer ${selectedSeat ? `phone-buzzer-${selectedSeat.team}` : ''}`}>
      <header className='phone-buzzer-header'>
        <div>
          <FaBolt aria-hidden='true' />
          <strong>ScoreBase</strong>
        </div>
        <span className={`phone-buzzer-status phone-buzzer-status-${buzzer.status}`}>
          <FaWifi aria-hidden='true' />
          {buzzer.status === 'ready' ? 'Connected' : buzzer.status === 'host-offline' ? 'Host offline' : 'Connecting'}
        </span>
      </header>

      <section className='phone-buzzer-body' aria-live='polite'>
        {!buzzer.seat ? (
          <div className='phone-buzzer-join'>
            <p className='phone-buzzer-eyebrow'>Live quiz</p>
            <h1>Choose your seat</h1>
            <div className='phone-buzzer-seats'>
              {buzzer.roster.map(item => {
                const isClaimed = buzzer.claimedSeats.includes(item.key)
                return (
                  <button
                    type='button'
                    className={`phone-seat-option phone-seat-option-${item.team}`}
                    disabled={isClaimed || buzzer.claimPending || buzzer.status !== 'ready'}
                    key={item.key}
                    onClick={() => buzzer.claimSeat(item.key)}
                  >
                    <strong>{item.label}</strong>
                    <span>{item.name}</span>
                    <small>{isClaimed ? 'Claimed' : buzzer.claimPending ? 'Joining...' : 'Available'}</small>
                  </button>
                )
              })}
            </div>
          </div>
        ) : (
          <div className='phone-buzzer-control'>
            <p className='phone-buzzer-eyebrow'>{selectedSeat?.team} team</p>
            <h1>{selectedSeat?.label} {selectedSeat?.name}</h1>
            <button
              type='button'
              className={`phone-buzzer-button${hasWon ? ' phone-buzzer-button-won' : ''}`}
              onClick={buzzer.buzz}
              disabled={!isReady}
              aria-label={buttonLabel}
            >
              {hasWon ? <FaCheckCircle aria-hidden='true' /> : <FaBolt aria-hidden='true' />}
              <span>{buttonLabel}</span>
            </button>
            <div className='phone-buzzer-round-status'>
              {hasWon ? 'The host has your answer controls open.' : buzzer.round.isLocked ? 'Another quizzer buzzed first.' : 'Ready for the next buzz.'}
            </div>
          </div>
        )}

        {buzzer.error && <p className='phone-buzzer-error' role='alert'>{buzzer.error}</p>}
      </section>
    </main>
  )
}

export default QuizBuzzer
