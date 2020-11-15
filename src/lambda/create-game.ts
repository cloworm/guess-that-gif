require('dotenv').config()
import { APIGatewayEvent, Context } from 'aws-lambda'
import {
  Game,
  Round,
} from '../../types'

export async function handler (
  _event: APIGatewayEvent,
  _context: Context
) {

  return {
    statusCode: 200,
    body: JSON.stringify({ game: await createGame() })
  }
}

export async function createGame(): Promise<Game> {
  const round: Round = {
    words: ['coarse', 'course', 'corse'],
    giphyUrl: 'https://media.giphy.com/media/zwOgFlmzF98sM/giphy.gif'
  }

  const game: Game = {
    id: '1',
    score: 0,
    lives: 3,
    round,
  }

  return game
}
