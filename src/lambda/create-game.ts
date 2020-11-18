require('dotenv').config()
import {
  GameInput,
  Game,
  Round,
} from '../../types'
import { generateRound } from './lib/generateRound'
import { transformGame } from './lib/transformGame'
import { respond } from './lib/respond'
import { httpMethod } from './lib/httpMethod'
import { createGame } from './queries/createGame'

export interface CreateGameResponse {
  game: Game
}

export const handler = httpMethod('POST', () => respond(response))

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
