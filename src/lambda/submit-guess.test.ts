import { response } from './submit-guess'
import { getGame } from './queries/getGame'
import { apiGatewayEvent } from './testing/apiGatewayEvent'

const mockedGetGame = getGame as jest.Mock<any>

beforeEach(() => {
  mockedGetGame.mockImplementationOnce((_data) => (Promise.resolve({
    ref: {
      id: '1001',
    },
    data: {
      score: 0,
      lives: 3,
      round: {
        words: ['bask', 'basque'],
        correctWord: 'basque',
        giphyUrl: 'https://giphy.com/fake_basque_image.gif'
      }
    }
  })))
})

describe('correct guess', () => {
  test('increments score, does not update lives, adds a new round', async () => {
    const { game } = await response(apiGatewayEvent(
      {
        httpMethod: 'POST',
        queryStringParameters: {
          id: '1001',
          guess: 'basque',
        }
      }
    ))
    expect(game.lives).toBe(3)
    expect(game.score).toBe(1)
    expect(game.id).toBe('1001')
    expect(JSON.stringify(game.round.words)).toBe(JSON.stringify(['hear', 'here']))
  })
})

describe('incorrect guess', () => {
  test('decrements lives, does not update score, adds a new round', async () => {
    const { game } = await response(apiGatewayEvent(
      {
        httpMethod: 'POST',
        queryStringParameters: {
          id: '1001',
          guess: 'bask',
        }
      }
    ))
    expect(game.lives).toBe(2)
    expect(game.score).toBe(0)
    expect(game.id).toBe('1001')
    expect(JSON.stringify(game.round.words)).toBe(JSON.stringify(['hear', 'here']))
  })
})
