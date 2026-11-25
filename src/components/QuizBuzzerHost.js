import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { FaCopy, FaMobileAlt, FaRedo, FaVolumeMute, FaVolumeUp } from 'react-icons/fa'
import './QuizBuzzerHost.css'

const QuizBuzzerHost = ({ buzzer }) => {
  const [copied, setCopied] = useState(false)
  const claimedSeats = buzzer.session.claimsBySeat || {}
  const winner = buzzer.session.winner?.seat
  const winnerRosterItem = buzzer.session.roster.find(item => item.key === winner)

  const copyInvite = async () => {
    try {
      await navigator.clipboard.writeText(buzzer.inviteUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (error) {
      setCopied(false)
    }
  }

  if (buzzer.status === 'idle') {
    return null
  }

  if (buzzer.status === 'error') {
    return (
      <section className='buzzer-host buzzer-host-error-state' role='alert'>
        <div className='buzzer-host-heading'>
          <FaMobileAlt aria-hidden='true' />
          <div>
            <h2>Phone buzzers</h2>
            <p>{buzzer.error || 'Unable to enable phone buzzers. Try again.'}</p>
          </div>
        </div>
      </section>
    )
  }

  if (buzzer.status === 'connecting') {
    return (
      <section className='buzzer-host buzzer-host-connecting' aria-live='polite'>
        <FaMobileAlt aria-hidden='true' />
        <span>Creating a private buzzer room...</span>
      </section>
    )
  }

  return (
    <section className='buzzer-host buzzer-host-live' aria-labelledby='buzzer-host-title'>
      <div className='buzzer-host-toolbar'>
        <div className='buzzer-host-heading'>
          <FaMobileAlt aria-hidden='true' />
          <div>
            <h2 id='buzzer-host-title'>Phone buzzers</h2>
            <p><span className='buzzer-live-dot' /> Live for {buzzer.connectedPeers.length} connected phone{buzzer.connectedPeers.length === 1 ? '' : 's'}</p>
          </div>
        </div>
        <div className='buzzer-host-actions'>
          <button type='button' className='buzzer-icon-button' onClick={buzzer.toggleSound} title={buzzer.soundEnabled ? 'Mute buzzer sound' : 'Unmute buzzer sound'} aria-label={buzzer.soundEnabled ? 'Mute buzzer sound' : 'Unmute buzzer sound'}>
            {buzzer.soundEnabled ? <FaVolumeUp /> : <FaVolumeMute />}
          </button>
          <button type='button' className='buzzer-icon-button' onClick={buzzer.reopen} title='Reopen buzzing' aria-label='Reopen buzzing'>
            <FaRedo />
          </button>
        </div>
      </div>

      <div className='buzzer-host-content'>
        <div className='buzzer-host-share'>
          <QRCodeSVG value={buzzer.inviteUrl} size={104} title='QR code for joining the quiz buzzer' />
          <div className='buzzer-host-share-copy'>
            <label htmlFor='buzzer-invite-url'>Phone join link</label>
            <div className='buzzer-invite-field'>
              <input id='buzzer-invite-url' value={buzzer.inviteUrl} readOnly />
              <button type='button' onClick={copyInvite} title='Copy invite link' aria-label='Copy invite link'>
                <FaCopy />
              </button>
            </div>
            <span aria-live='polite'>{copied ? 'Copied' : 'Scan the QR code or open this link on each phone.'}</span>
          </div>
        </div>

        <div className='buzzer-host-roster' aria-label='Buzzer seat status'>
          {buzzer.session.roster.map(item => {
            const isClaimed = Boolean(claimedSeats[item.key])
            const isWinner = winner === item.key
            return (
              <div className={`buzzer-host-seat buzzer-host-seat-${item.team}${isWinner ? ' buzzer-host-seat-winner' : ''}`} key={item.key}>
                <strong>{item.label}</strong>
                <span>{item.name}</span>
                <small>{isWinner ? 'Buzzed' : isClaimed ? 'Connected' : 'Open seat'}</small>
              </div>
            )
          })}
        </div>
      </div>

      {winnerRosterItem && (
        <div className='buzzer-winner-banner' role='status'>
          <strong>{winnerRosterItem.label} {winnerRosterItem.name}</strong> buzzed first. Resolve the scorebar action, then reopen buzzing when ready.
        </div>
      )}
      {buzzer.error && <p className='buzzer-host-error' role='alert'>{buzzer.error}</p>}
    </section>
  )
}

export default QuizBuzzerHost
