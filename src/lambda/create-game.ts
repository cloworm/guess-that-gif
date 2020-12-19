require('dotenv').config()
import compose from 'compose-function'

import {
  CreateGameResponse,
  GameInput,
  Round,
} from '../../types'
import { generateRound } from './lib/generateRound'
import { httpMethod, httpRespond, Handler } from './lib/http'
import { transformGame } from './lib/transformGame'
import { createGame } from './queries/createGame'

export const handler: Handler = compose(
  httpRespond(),
  httpMethod('POST'),
)(async (): Promise<CreateGameResponse> => ({
  game: transformGame(await createGame(await generateGame()))
}))

export async function generateGame(): Promise<GameInput> {
  const round: Round = await generateRound()

  const game: GameInput = {
    score: 0,
    lives: 3,
    round,
  }

  return game
}
