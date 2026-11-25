import { createQuizBuzzerInvite, parseQuizBuzzerInvite } from './quizBuzzerInvite'

test('round-trips room credentials through a URL-safe invite', () => {
  const credentials = {
    roomId: 'scorebase-room~signed-room-authority',
    password: 'phone-join-secret'
  }

  const invite = createQuizBuzzerInvite(credentials)

  expect(invite).toMatch(/^[A-Za-z0-9_-]+$/)
  expect(parseQuizBuzzerInvite(invite)).toEqual(credentials)
})

test('returns null for malformed invite data', () => {
  expect(parseQuizBuzzerInvite('not-valid')).toBeNull()
  expect(parseQuizBuzzerInvite('')).toBeNull()
})
