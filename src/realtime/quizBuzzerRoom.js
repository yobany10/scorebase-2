import { joinRoom, roles } from 'trystero'

const APP_ID = 'scorebase/quiz-buzzer'
const MAX_ROOM_USERS = 7
const ROSTER_ACTION = 'scorebase-roster'
const ROUND_ACTION = 'scorebase-round'
const CLAIM_ACTION = 'scorebase-seat-claim'
const CLAIM_RESULT_ACTION = 'scorebase-seat-claim-result'
const BUZZ_ACTION = 'scorebase-buzz'
const BUZZ_RESULT_ACTION = 'scorebase-buzz-result'

const runCallback = (callback, ...args) => {
  if (callback) {
    return callback(...args)
  }
  return undefined
}

const subscribeToRoom = (room, callback) => {
  const subscriptions = []
  subscriptions.push(room.onError(error => runCallback(callback.onError, error)))
  subscriptions.push(room.onPeerJoin(context => runCallback(callback.onPeerJoin, context)))
  subscriptions.push(room.onPeerLeave(context => runCallback(callback.onPeerLeave, context)))
  return subscriptions
}

const closeRoom = async (room, subscriptions) => {
  subscriptions.forEach(unsubscribe => unsubscribe())
  await room.leave()
}

export const createHostBuzzerRoom = async ({
  roomId,
  password,
  rosterState,
  roundState,
  onClaim,
  onBuzz,
  onPeerJoin,
  onPeerLeave,
  onError
}) => {
  const room = joinRoom({
    appId: APP_ID,
    maxUsers: MAX_ROOM_USERS,
    password,
    use: [roles({ selfAsAdmin: true })]
  }, roomId)
  const rosterAction = room.makeAction(ROSTER_ACTION, { roles: 'admin' })
  const roundAction = room.makeAction(ROUND_ACTION, { roles: 'admin' })
  const claimAction = room.makeAction(CLAIM_ACTION)
  const claimResultAction = room.makeAction(CLAIM_RESULT_ACTION)
  const buzzAction = room.makeAction(BUZZ_ACTION)
  const buzzResultAction = room.makeAction(BUZZ_RESULT_ACTION)
  let currentRosterState = rosterState
  let currentRoundState = roundState

  claimAction.onMessage(async (payload, context) => {
    const result = await runCallback(onClaim, payload, context)
    if (result) {
      await claimResultAction.send(result, { target: context.peerId })
    }
  })
  buzzAction.onMessage(async (payload, context) => {
    const result = await runCallback(onBuzz, payload, context)
    if (result) {
      await buzzResultAction.send(result, { target: context.peerId })
    }
  })

  const subscriptions = subscribeToRoom(room, {
    onError,
    onPeerJoin: async context => {
      await Promise.all([
        rosterAction.send(currentRosterState, { target: context.peerId }),
        roundAction.send(currentRoundState, { target: context.peerId })
      ])
      runCallback(onPeerJoin, context)
    },
    onPeerLeave
  })
  await room.ready
  const self = await room.getSelf()

  return {
    roomId: self.roomId,
    peerId: self.peerId,
    userId: self.userId,
    publishRoster: nextRoster => {
      currentRosterState = nextRoster
      return rosterAction.send(nextRoster)
    },
    publishRound: nextRound => {
      currentRoundState = nextRound
      return roundAction.send(nextRound)
    },
    close: () => closeRoom(room, subscriptions)
  }
}

export const joinQuizBuzzerRoom = async ({
  roomId,
  password,
  onRoster,
  onRound,
  onClaimResult,
  onBuzzResult,
  onHostJoin,
  onHostLeave,
  onError
}) => {
  const room = joinRoom({
    appId: APP_ID,
    identity: 'none',
    maxUsers: MAX_ROOM_USERS,
    password,
    use: [roles()]
  }, roomId)
  const rosterAction = room.makeAction(ROSTER_ACTION, { roles: 'admin' })
  const roundAction = room.makeAction(ROUND_ACTION, { roles: 'admin' })
  const claimAction = room.makeAction(CLAIM_ACTION)
  const claimResultAction = room.makeAction(CLAIM_RESULT_ACTION)
  const buzzAction = room.makeAction(BUZZ_ACTION)
  const buzzResultAction = room.makeAction(BUZZ_RESULT_ACTION)

  let hostPeerId = null
  const subscriptions = subscribeToRoom(room, {
    onError,
    onPeerJoin: context => {
      if (context.roles.includes('admin')) {
        hostPeerId = context.peerId
        runCallback(onHostJoin, context)
      }
    },
    onPeerLeave: context => {
      if (context.peerId === hostPeerId) {
        hostPeerId = null
        runCallback(onHostLeave, context)
      }
    }
  })
  subscriptions.push(rosterAction.onMessage((nextRoster, context) => {
    if (context.roles.includes('admin')) {
      runCallback(onRoster, nextRoster, context)
    }
  }))
  subscriptions.push(roundAction.onMessage((nextRound, context) => {
    if (context.roles.includes('admin')) {
      runCallback(onRound, nextRound, context)
    }
  }))
  subscriptions.push(claimResultAction.onMessage((payload, context) => {
    if (context.roles.includes('admin')) {
      runCallback(onClaimResult, payload, context)
    }
  }))
  subscriptions.push(buzzResultAction.onMessage((payload, context) => {
    if (context.roles.includes('admin')) {
      runCallback(onBuzzResult, payload, context)
    }
  }))

  await room.ready
  const self = await room.getSelf()

  return {
    peerId: self.peerId,
    userId: self.userId,
    claimSeat: payload => claimAction.send(payload),
    buzz: payload => buzzAction.send(payload),
    close: () => closeRoom(room, subscriptions)
  }
}
