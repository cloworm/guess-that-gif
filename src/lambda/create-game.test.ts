import { createGame } from './create-game'

test('createGame', async () => {
  const newGame = await createGame()
  expect(newGame.score).toBe(0)
  expect(newGame.lives).toBe(3)
  expect(typeof newGame.id).toBe("string")
})
