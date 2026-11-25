import {
  acceptBuzzerBuzz,
  claimBuzzerSeat,
  createBuzzerSession,
  releaseBuzzerPeer,
  reopenBuzzerRound,
  updateBuzzerRoster
} from './quizBuzzerProtocol'

const roster = [
  { key: 'red1', label: 'R1', name: 'Alex Able', team: 'red' },
  { key: 'yellow2', label: 'Y2', name: 'Zoe Zebra', team: 'yellow' }
]

test('accepts one seat per peer and rejects a seat owned by another phone', () => {
  const session = createBuzzerSession(roster, 'round-1')
  const firstClaim = claimBuzzerSeat(session, 'peer-a', 'red1')
  const duplicateClaim = claimBuzzerSeat(firstClaim.session, 'peer-a', 'red1')
  const conflictingClaim = claimBuzzerSeat(duplicateClaim.session, 'peer-b', 'red1')

  expect(firstClaim.accepted).toBe(true)
  expect(duplicateClaim.accepted).toBe(true)
  expect(conflictingClaim).toMatchObject({ accepted: false, reason: 'seat-taken' })
  expect(conflictingClaim.session.claimsBySeat).toEqual({ red1: 'peer-a' })
})

test('moving a peer to another seat releases its previous claim', () => {
  const claimed = claimBuzzerSeat(createBuzzerSession(roster, 'round-1'), 'peer-a', 'red1')
  const moved = claimBuzzerSeat(claimed.session, 'peer-a', 'yellow2')

  expect(moved.session.claimsBySeat).toEqual({ yellow2: 'peer-a' })
  expect(moved.session.seatByPeer).toEqual({ 'peer-a': 'yellow2' })
})

test('only the first buzz in the current round is accepted', () => {
  const redClaim = claimBuzzerSeat(createBuzzerSession(roster, 'round-1'), 'peer-red', 'red1')
  const yellowClaim = claimBuzzerSeat(redClaim.session, 'peer-yellow', 'yellow2')
  const firstBuzz = acceptBuzzerBuzz(yellowClaim.session, 'peer-yellow', {
    buzzId: 'buzz-1',
    roundId: 'round-1'
  })
  const laterBuzz = acceptBuzzerBuzz(firstBuzz.session, 'peer-red', {
    buzzId: 'buzz-2',
    roundId: 'round-1'
  })

  expect(firstBuzz).toMatchObject({ accepted: true, winner: { seat: 'yellow2', peerId: 'peer-yellow' } })
  expect(laterBuzz).toMatchObject({ accepted: false, reason: 'round-locked' })
})

test('rejects buzzes from stale rounds and unopened seats', () => {
  const claimed = claimBuzzerSeat(createBuzzerSession(roster, 'round-2'), 'peer-a', 'red1')

  expect(acceptBuzzerBuzz(claimed.session, 'peer-a', {
    buzzId: 'buzz-old',
    roundId: 'round-1'
  })).toMatchObject({ accepted: false, reason: 'stale-round' })
  expect(acceptBuzzerBuzz(claimed.session, 'peer-without-seat', {
    buzzId: 'buzz-new',
    roundId: 'round-2'
  })).toMatchObject({ accepted: false, reason: 'seat-unclaimed' })
})

test('reopening creates a new round while preserving claimed seats', () => {
  const claimed = claimBuzzerSeat(createBuzzerSession(roster, 'round-1'), 'peer-a', 'red1')
  const buzzed = acceptBuzzerBuzz(claimed.session, 'peer-a', {
    buzzId: 'buzz-1',
    roundId: 'round-1'
  })
  const reopened = reopenBuzzerRound(buzzed.session, 'round-2')
  const nextBuzz = acceptBuzzerBuzz(reopened, 'peer-a', {
    buzzId: 'buzz-2',
    roundId: 'round-2'
  })

  expect(reopened).toMatchObject({ roundId: 'round-2', isLocked: false, winner: null })
  expect(reopened.claimsBySeat).toEqual({ red1: 'peer-a' })
  expect(nextBuzz.accepted).toBe(true)
})

test('releases disconnected peers and claims for seats removed from the roster', () => {
  const redClaim = claimBuzzerSeat(createBuzzerSession(roster, 'round-1'), 'peer-red', 'red1')
  const yellowClaim = claimBuzzerSeat(redClaim.session, 'peer-yellow', 'yellow2')
  const released = releaseBuzzerPeer(yellowClaim.session, 'peer-yellow')
  const rosterChanged = updateBuzzerRoster(released, [roster[0]])

  expect(released.claimsBySeat).toEqual({ red1: 'peer-red' })
  expect(rosterChanged.claimsBySeat).toEqual({ red1: 'peer-red' })
})
