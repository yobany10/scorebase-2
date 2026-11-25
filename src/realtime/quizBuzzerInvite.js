const toBase64Url = value => btoa(value)
  .replaceAll('+', '-')
  .replaceAll('/', '_')
  .replace(/=+$/, '')

const fromBase64Url = value => {
  const base64 = value.replaceAll('-', '+').replaceAll('_', '/')
  const padded = `${base64}${'='.repeat((4 - base64.length % 4) % 4)}`
  return atob(padded)
}

const randomToken = length => {
  const alphabet = 'abcdefghjkmnpqrstuvwxyz23456789'
  const values = new Uint8Array(length)
  window.crypto.getRandomValues(values)

  return Array.from(values, value => alphabet[value % alphabet.length]).join('')
}

export const createQuizBuzzerCredentials = () => ({
  roomId: `scorebase-${randomToken(18)}`,
  password: randomToken(32)
})

export const createQuizBuzzerInvite = ({ roomId, password }) => {
  if (!roomId || !password) {
    throw new Error('A room ID and password are required to create an invite.')
  }

  return toBase64Url(JSON.stringify({ roomId, password }))
}

export const parseQuizBuzzerInvite = invite => {
  if (typeof invite !== 'string' || !invite) {
    return null
  }

  try {
    const parsed = JSON.parse(fromBase64Url(invite))
    if (typeof parsed.roomId !== 'string' || typeof parsed.password !== 'string') {
      return null
    }

    return parsed
  } catch (error) {
    return null
  }
}
