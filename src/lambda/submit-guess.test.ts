import { handler } from './submit-guess'
import { getGame } from './queries/getGame'
import { apiGatewayEvent, context, parse } from './testing'

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

test('only supports POST requests', async () => {
  const { statusCode, body } = await handler(apiGatewayEvent({ httpMethod: 'GET' }), context)
  expect(statusCode).toBe(500)
  expect(body).toContain("HTTP method 'POST' is required")
})

describe('correct guess', () => {
  test('increments score, does not update lives, adds a new round', async () => {
    const { statusCode, body: { game } } = parse(await handler(apiGatewayEvent({
      httpMethod: 'POST',
      queryStringParameters: {
        id: '1001',
        guess: 'basque',
      }
    }), context))

    expect(statusCode).toBe(200)
    expect(game.lives).toBe(3)
    expect(game.score).toBe(1)
    expect(game.id).toBe('1001')
    expect(JSON.stringify(game.round.words)).toBe(JSON.stringify(['hear', 'here']))
  })
})

describe('incorrect guess', () => {
  test('decrements lives, does not update score, adds a new round', async () => {
    const { statusCode, body: { game } } = parse(await handler(apiGatewayEvent({
      httpMethod: 'POST',
      queryStringParameters: {
        id: '1001',
        guess: 'bask',
      }
    }), context))

    expect(statusCode).toBe(200)
    expect(game.lives).toBe(2)
    expect(game.score).toBe(0)
    expect(game.id).toBe('1001')
    expect(JSON.stringify(game.round.words)).toBe(JSON.stringify(['hear', 'here']))
  })
})
