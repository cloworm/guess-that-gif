require('dotenv').config()
import { APIGatewayEvent, Context } from 'aws-lambda'
import {
  GameInput,
  Game,
  Round,
} from '../../types'
import {
  generateRound
} from './lib/generateRound'
import {
  createGame
} from './queries/createGame'
import { transformGame } from './lib/transformGame'

export interface CreateGameResponse {
  game: Game
}

export async function responser (
  _event: APIGatewayEvent,
  _context: Context
) {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify(response())
    }
  } catch(err) {
    return {
      statusCode: 500,
      body: `Error: ${err}`
    }
  }
}

export async function response(): Promise<CreateGameResponse> {
  return {
    game: transformGame(await createGame(await generateGame()))
  }
}

export async function generateGame(): Promise<GameInput> {
  const round: Round = await generateRound()

  const game: GameInput = {
    score: 0,
    lives: 3,
    round,
  }

  return game
}
