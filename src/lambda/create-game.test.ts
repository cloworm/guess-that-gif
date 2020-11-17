import { response } from './create-game'
import { createGame } from './queries/createGame'
import { GameInput } from '../../types'

const mockedCreateGame = createGame as jest.Mock<any>

test('response with default mocked data', async () => {
  const { game } = await response()
  expect(game.id).toBe('1')
  expect(game.score).toBe(0)
  expect(game.lives).toBe(3)
  expect(JSON.stringify(game.round.words)).toBe(JSON.stringify(['bear', 'bare']))
  expect(game.round.giphyUrl).toBe('https://giphy.com/fake_bear_image.gif')
})

test('response when mocking specific data', async () => {
  mockedCreateGame.mockImplementationOnce((_data: GameInput) => (Promise.resolve({
    ref: {
      id: '2',
    },
    data: {
      score: 0,
      lives: 3,
      round: {
        words: ['cool', 'kewl'],
        giphyUrl: 'https://giphy.com/fake_kewl_image.gif'
      }
    }
  })))

  const { game } = await response()
  expect(game.id).toBe('2')
  expect(game.score).toBe(0)
  expect(game.lives).toBe(3)
  expect(JSON.stringify(game.round.words)).toBe(JSON.stringify(['cool', 'kewl']))
  expect(game.round.giphyUrl).toBe('https://giphy.com/fake_kewl_image.gif')
})
