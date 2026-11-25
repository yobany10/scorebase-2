import { useEffect, useRef, useState } from 'react'
import { parseQuizBuzzerInvite } from './quizBuzzerInvite'
import { joinQuizBuzzerRoom } from './quizBuzzerRoom'

const createId = prefix => `${prefix}-${Date.now()}-${window.crypto.randomUUID?.() || Math.random().toString(36).slice(2)}`

export const useQuizBuzzerClient = invite => {
  const roomRef = useRef(null)
  const seatRef = useRef('')
  const requestIdRef = useRef('')
  const [status, setStatus] = useState('connecting')
  const [error, setError] = useState('')
  const [roster, setRoster] = useState([])
  const [claimedSeats, setClaimedSeats] = useState([])
  const [round, setRound] = useState({ roundId: '', isLocked: false, winner: null })
  const [seat, setSeat] = useState('')
  const [claimPending, setClaimPending] = useState(false)
  const [buzzPending, setBuzzPending] = useState(false)

  useEffect(() => {
    const credentials = parseQuizBuzzerInvite(invite)
    if (!credentials) {
      setStatus('error')
      setError('This buzzer invite is not valid. Ask the host for a new link.')
      return undefined
    }

    let cancelled = false
    let connectedRoom

    const connect = async () => {
      try {
        connectedRoom = await joinQuizBuzzerRoom({
          ...credentials,
          onRoster: nextState => {
            if (cancelled) return
            setRoster(nextState?.roster || [])
            setClaimedSeats(nextState?.claims || [])
            setStatus('ready')
            setError('')
          },
          onRound: nextRound => {
            if (cancelled || !nextRound) return
            setRound(nextRound)
            setBuzzPending(false)
          },
          onClaimResult: result => {
            if (cancelled || result.requestId !== requestIdRef.current) return
            setClaimPending(false)
            if (result.accepted) {
              seatRef.current = result.seat
              setSeat(result.seat)
              setError('')
            } else {
              const messages = {
                'seat-taken': 'That seat was just claimed. Choose another seat.',
                'inactive-seat': 'That seat is not active for this quiz.'
              }
              setError(messages[result.reason] || 'The host could not assign that seat. Try again.')
            }
          },
          onBuzzResult: result => {
            if (cancelled) return
            setBuzzPending(false)
            if (!result.accepted) {
              setError(result.reason === 'stale-round'
                ? 'The host moved to a new question. Try again on the current round.'
                : 'That buzz was not accepted by the host.')
            }
          },
          onHostJoin: async () => {
            if (cancelled) return
            setStatus('ready')
            if (seatRef.current && roomRef.current) {
              const requestId = createId('claim')
              requestIdRef.current = requestId
              setClaimPending(true)
              await roomRef.current.claimSeat({ requestId, seat: seatRef.current })
            }
          },
          onHostLeave: () => {
            if (cancelled) return
            setStatus('host-offline')
            setBuzzPending(false)
          },
          onError: roomError => {
            if (cancelled) return
            setError(roomError.message || 'The buzzer connection reported a problem.')
          }
        })

        if (cancelled) {
          await connectedRoom.close()
          return
        }

        roomRef.current = connectedRoom
      } catch (roomError) {
        if (!cancelled) {
          setStatus('error')
          setError(roomError.message || 'Unable to connect to the quiz. Check with the host and try again.')
        }
      }
    }

    connect()

    return () => {
      cancelled = true
      roomRef.current = null
      if (connectedRoom) {
        connectedRoom.close()
      }
    }
  }, [invite])

  const claimSeat = async nextSeat => {
    if (!roomRef.current || claimPending) return
    const requestId = createId('claim')
    requestIdRef.current = requestId
    setClaimPending(true)
    setError('')
    await roomRef.current.claimSeat({ requestId, seat: nextSeat })
  }

  const buzz = async () => {
    if (!roomRef.current || !seat || !round.roundId || round.isLocked || buzzPending) return
    setBuzzPending(true)
    setError('')
    await roomRef.current.buzz({
      buzzId: createId('buzz'),
      roundId: round.roundId
    })
  }

  return {
    status,
    error,
    roster,
    claimedSeats,
    round,
    seat,
    claimPending,
    buzzPending,
    claimSeat,
    buzz
  }
}
