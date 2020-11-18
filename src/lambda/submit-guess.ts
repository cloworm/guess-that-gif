require('dotenv').config()
import { APIGatewayEvent, Context } from 'aws-lambda'

import { getGame } from './queries/getGame'
import { Game } from '../../types'
import { generateRound } from './lib/generateRound'
import { respond } from './lib/respond'
import { transformGame } from './lib/transformGame'
import { updateGame } from './queries/updateGame'

// TODO: httpMethod('POST')
export async function handler (
  event: APIGatewayEvent,
  _context: Context
) {
  const {
    id,
    guess
  } = event.queryStringParameters || {}
  if (!id || !guess) {
    throw new Error('INVALID_QUERY_STRING')
  }

  return respond(() => response({ id, guess }))
}

export async function response({ id, guess }: { id: string, guess: string}) {
  const game: Game = (await getGame(id)).data
  const isCorrect = guess === game.round.correctWord
  // TODO: Only generate and assign a new round is next value of `lives` is greater than 0.
  const round = await generateRound()
  const prevRound = {
    ...game.round,
    wasCorrect: isCorrect,
    guessedWord: guess
  }

  const updatedGame = await updateGame(id, {
    score: isCorrect ? game.score + 1 : game.score,
    lives: isCorrect ? game.lives : game.lives - 1,
    round: round,
    roundHistory: [...game.roundHistory || [], prevRound]
  })

  return {
    game: transformGame(updatedGame)
  }
}
