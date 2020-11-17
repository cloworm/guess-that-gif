import { fetchGame } from './submit-guess'

// TODO: This doesn't really test anything since getGame is mocked, but this is better than an empty file, which fails.
test('fetchGame returns the game', async () => {
  const result = await fetchGame('id arg can be anything because getGame is mocked')
  expect(result.lives).toBe(2)
})

// TODO
// test('submitGuess correct', () => {
//   const result = submitGuess('1')
//   expect(result.lives).toBe(3)
// })

// test('submitGuess correct', () => {
//   const result = submitGuess('1')
//   expect(result.lives).toBe(2)
// })
