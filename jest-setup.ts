import { Game } from './types'

jest.mock('./src/lambda/queries/createGame', () => {
  return {
    createGame: jest.fn((_data) => (Promise.resolve({
      ref: {
        id: '1',
      },
      data: {
        score: 0,
        lives: 3,
        round: {
          words: ['bear', 'bare'],
          giphyUrl: 'https://giphy.com/fake_bear_image.gif'
        }
      }
    })))
  }
})

jest.mock('./src/lambda/queries/updateGame', () => {
  return {
    updateGame: jest.fn((id: string, data: Game) => (Promise.resolve({
      ref: {
        id,
      },
      data,
    })))
  }
})

jest.mock('./src/lambda/queries/getGame', () => {
  return {
    getGame: jest.fn((_data) => (Promise.resolve({
      ref: {
        id: '2',
      },
      data: {
        score: 1,
        lives: 2,
        round: {
          words: ['do', 'due'],
          giphyUrl: 'https://giphy.com/fake_do_image.gif'
        }
      }
    })))
  }
})

// TODO: Refactor 3rd party service calls out of generateRound
// TODO: ^ Mock those instead of the whole generateRound
// TODO: Unit-test generateRound function
jest.mock('./src/lambda/lib/generateRound', () => {
  return {
    generateRound: jest.fn((_data) => (Promise.resolve({
      words: ['hear', 'here'],
      correctWord: ['hear'],
      giphyUrl: 'https://giphy.com/fake_hear_image.gif'
    })))
  }
})

// TypeScript complains if we don't export anything from a file.
export default undefined
