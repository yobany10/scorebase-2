import { useCallback, useEffect, useRef, useState } from 'react'
import { createQuizBuzzerCredentials, createQuizBuzzerInvite } from './quizBuzzerInvite'
import {
  acceptBuzzerBuzz,
  claimBuzzerSeat,
  createBuzzerSession,
  getBuzzerRosterState,
  getBuzzerRoundState,
  isBuzzPayload,
  isSeatClaimPayload,
  releaseBuzzerPeer,
  reopenBuzzerRound,
  updateBuzzerRoster
} from './quizBuzzerProtocol'
import { createHostBuzzerRoom } from './quizBuzzerRoom'
import { playBuzzerSound, primeBuzzerSound } from '../utils/buzzerSound'

const createId = prefix => `${prefix}-${Date.now()}-${window.crypto.randomUUID?.() || Math.random().toString(36).slice(2)}`

const initialConnectionState = {
  status: 'idle',
  inviteUrl: '',
  error: '',
  connectedPeers: []
}

export const useQuizBuzzerHost = ({ roster, onBuzz }) => {
  const rosterRef = useRef(roster)
  const onBuzzRef = useRef(onBuzz)
  const roomRef = useRef(null)
  const sessionRef = useRef(createBuzzerSession(roster, ''))
  const isMountedRef = useRef(true)
  const soundEnabledRef = useRef(true)
  const [session, setSession] = useState(sessionRef.current)
  const [connection, setConnection] = useState(initialConnectionState)
  const [soundEnabled, setSoundEnabled] = useState(true)

  rosterRef.current = roster
  onBuzzRef.current = onBuzz
  soundEnabledRef.current = soundEnabled

  const updateSession = useCallback(nextSession => {
    sessionRef.current = nextSession
    if (isMountedRef.current) {
      setSession(nextSession)
    }
  }, [])

  const publishRoster = useCallback(async () => {
    if (roomRef.current) {
      await roomRef.current.publishRoster(getBuzzerRosterState(sessionRef.current))
    }
  }, [])

  const publishRound = useCallback(async () => {
    if (roomRef.current) {
      await roomRef.current.publishRound(getBuzzerRoundState(sessionRef.current))
    }
  }, [])

  const stop = useCallback(async () => {
    const activeRoom = roomRef.current
    roomRef.current = null

    if (isMountedRef.current) {
      updateSession(createBuzzerSession(rosterRef.current, ''))
      setConnection(initialConnectionState)
    }

    if (activeRoom) {
      try {
        await activeRoom.close()
      } catch (error) {
        console.error('Unable to close buzzer room.', error)
      }
    }
  }, [updateSession])

  const enable = useCallback(async () => {
    if (roomRef.current || connection.status === 'connecting') {
      return
    }

    setConnection(current => ({ ...current, status: 'connecting', error: '' }))
    try {
      await primeBuzzerSound()
    } catch (error) {
      console.warn('Unable to enable buzzer sound.', error)
    }

    try {
      const credentials = createQuizBuzzerCredentials()
      const roundId = createId('round')
      updateSession(createBuzzerSession(rosterRef.current, roundId))
      const room = await createHostBuzzerRoom({
        ...credentials,
        rosterState: getBuzzerRosterState(sessionRef.current),
        roundState: getBuzzerRoundState(sessionRef.current),
        onClaim: async (payload, context) => {
          if (!isSeatClaimPayload(payload)) {
            return { accepted: false, reason: 'invalid-claim', requestId: payload?.requestId || '' }
          }

          const claim = claimBuzzerSeat(sessionRef.current, context.peerId, payload.seat)
          updateSession(claim.session)
          await publishRoster()
          return {
            accepted: claim.accepted,
            reason: claim.reason,
            requestId: payload.requestId,
            seat: claim.accepted ? payload.seat : null
          }
        },
        onBuzz: async (payload, context) => {
          if (!isBuzzPayload(payload)) {
            return { accepted: false, reason: 'invalid-buzz', buzzId: payload?.buzzId || '' }
          }

          const buzz = acceptBuzzerBuzz(sessionRef.current, context.peerId, payload)
          if (!buzz.accepted) {
            return { accepted: false, reason: buzz.reason, buzzId: payload.buzzId }
          }

          updateSession(buzz.session)
          await publishRound()
          if (soundEnabledRef.current) {
            playBuzzerSound()
          }
          onBuzzRef.current?.(buzz.winner)
          return { accepted: true, reason: buzz.reason, buzzId: payload.buzzId }
        },
        onPeerJoin: context => {
          setConnection(current => ({
            ...current,
            connectedPeers: [...new Set([...current.connectedPeers, context.peerId])]
          }))
        },
        onPeerLeave: async context => {
          updateSession(releaseBuzzerPeer(sessionRef.current, context.peerId))
          await publishRoster()
          setConnection(current => ({
            ...current,
            connectedPeers: current.connectedPeers.filter(peerId => peerId !== context.peerId)
          }))
        },
        onError: error => {
          if (isMountedRef.current) {
            setConnection(current => ({ ...current, error: error.message || 'The buzzer room reported a connection problem.' }))
          }
        }
      })

      if (!isMountedRef.current) {
        await room.close()
        return
      }

      roomRef.current = room
      const invite = createQuizBuzzerInvite({ roomId: room.roomId, password: credentials.password })
      setConnection({
        status: 'live',
        inviteUrl: `${window.location.origin}/buzz/${invite}`,
        error: '',
        connectedPeers: []
      })
    } catch (error) {
      if (isMountedRef.current) {
        setConnection(current => ({
          ...current,
          status: 'error',
          error: error.message || 'Unable to start phone buzzers.'
        }))
      }
    }
  }, [connection.status, publishRoster, publishRound, updateSession])

  const reopen = useCallback(async () => {
    if (!roomRef.current) {
      return
    }

    updateSession(reopenBuzzerRound(sessionRef.current, createId('round')))
    await publishRound()
  }, [publishRound, updateSession])

  useEffect(() => {
    if (!roomRef.current) {
      sessionRef.current = createBuzzerSession(rosterRef.current, sessionRef.current.roundId)
      setSession(sessionRef.current)
      return
    }

    const nextSession = updateBuzzerRoster(sessionRef.current, roster)
    updateSession(nextSession)
    publishRoster()
  }, [roster, publishRoster, updateSession])

  useEffect(() => () => {
    isMountedRef.current = false
    const activeRoom = roomRef.current
    roomRef.current = null
    if (activeRoom) {
      activeRoom.close()
    }
  }, [])

  return {
    ...connection,
    session,
    soundEnabled,
    enable,
    stop,
    reopen,
    toggleSound: () => setSoundEnabled(enabled => !enabled)
  }
}
