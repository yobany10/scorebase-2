export const QUIZZER_SEATS = Object.freeze([
  'red1',
  'red2',
  'red3',
  'red4',
  'red5',
  'yellow1',
  'yellow2',
  'yellow3',
  'yellow4',
  'yellow5'
])

const validSeats = new Set(QUIZZER_SEATS)

const isNonEmptyString = value => typeof value === 'string' && value.trim().length > 0

export const isSeatClaimPayload = payload => Boolean(
  payload &&
  isNonEmptyString(payload.requestId) &&
  isNonEmptyString(payload.seat) &&
  validSeats.has(payload.seat)
)

export const isBuzzPayload = payload => Boolean(
  payload &&
  isNonEmptyString(payload.buzzId) &&
  isNonEmptyString(payload.roundId)
)

export const createBuzzerSession = (roster = [], roundId = '') => ({
  roster: sanitizeRoster(roster),
  roundId,
  isLocked: false,
  claimsBySeat: {},
  seatByPeer: {},
  winner: null,
  usedBuzzIds: []
})

export const sanitizeRoster = roster => {
  if (!Array.isArray(roster)) {
    return []
  }

  const seenSeats = new Set()
  return roster.filter(item => {
    if (!item || !validSeats.has(item.key) || seenSeats.has(item.key) || !isNonEmptyString(item.name)) {
      return false
    }

    seenSeats.add(item.key)
    return true
  }).map(item => ({
    key: item.key,
    label: isNonEmptyString(item.label) ? item.label : item.key.toUpperCase(),
    name: item.name.trim(),
    team: item.key.startsWith('red') ? 'red' : 'yellow'
  }))
}

export const updateBuzzerRoster = (session, roster) => {
  const nextRoster = sanitizeRoster(roster)
  const activeSeats = new Set(nextRoster.map(item => item.key))
  const claimsBySeat = {}
  const seatByPeer = {}

  Object.entries(session.claimsBySeat).forEach(([seat, peerId]) => {
    if (activeSeats.has(seat)) {
      claimsBySeat[seat] = peerId
      seatByPeer[peerId] = seat
    }
  })

  return {
    ...session,
    roster: nextRoster,
    claimsBySeat,
    seatByPeer
  }
}

export const claimBuzzerSeat = (session, peerId, seat) => {
  if (!isNonEmptyString(peerId) || !validSeats.has(seat)) {
    return { accepted: false, reason: 'invalid-claim', session }
  }

  if (!session.roster.some(item => item.key === seat)) {
    return { accepted: false, reason: 'inactive-seat', session }
  }

  const currentPeer = session.claimsBySeat[seat]
  if (currentPeer && currentPeer !== peerId) {
    return { accepted: false, reason: 'seat-taken', session }
  }

  const previousSeat = session.seatByPeer[peerId]
  const claimsBySeat = { ...session.claimsBySeat }
  const seatByPeer = { ...session.seatByPeer, [peerId]: seat }

  if (previousSeat && previousSeat !== seat) {
    delete claimsBySeat[previousSeat]
  }

  claimsBySeat[seat] = peerId

  return {
    accepted: true,
    reason: 'claimed',
    session: {
      ...session,
      claimsBySeat,
      seatByPeer
    }
  }
}

export const releaseBuzzerPeer = (session, peerId) => {
  const seat = session.seatByPeer[peerId]
  if (!seat) {
    return session
  }

  const claimsBySeat = { ...session.claimsBySeat }
  const seatByPeer = { ...session.seatByPeer }
  delete claimsBySeat[seat]
  delete seatByPeer[peerId]

  return {
    ...session,
    claimsBySeat,
    seatByPeer
  }
}

export const acceptBuzzerBuzz = (session, peerId, payload) => {
  if (!isBuzzPayload(payload)) {
    return { accepted: false, reason: 'invalid-buzz', session }
  }

  const seat = session.seatByPeer[peerId]
  if (!seat) {
    return { accepted: false, reason: 'seat-unclaimed', session }
  }

  if (payload.roundId !== session.roundId) {
    return { accepted: false, reason: 'stale-round', session }
  }

  if (session.isLocked) {
    return { accepted: false, reason: 'round-locked', session }
  }

  if (session.usedBuzzIds.includes(payload.buzzId)) {
    return { accepted: false, reason: 'duplicate-buzz', session }
  }

  const winner = { peerId, seat, buzzId: payload.buzzId }
  return {
    accepted: true,
    reason: 'buzz-accepted',
    session: {
      ...session,
      isLocked: true,
      winner,
      usedBuzzIds: [...session.usedBuzzIds.slice(-49), payload.buzzId]
    },
    winner
  }
}

export const reopenBuzzerRound = (session, roundId) => ({
  ...session,
  roundId,
  isLocked: false,
  winner: null,
  usedBuzzIds: []
})

export const getBuzzerRosterState = session => ({
  roster: session.roster,
  claims: Object.keys(session.claimsBySeat)
})

export const getBuzzerRoundState = session => ({
  roundId: session.roundId,
  isLocked: session.isLocked,
  winner: session.winner ? session.winner.seat : null
})
