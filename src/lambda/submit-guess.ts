require('dotenv').config()
import { APIGatewayEvent } from 'aws-lambda'
import compose from 'compose-function'

import { getGame } from './queries/getGame'
import { Game } from '../../types'
import { generateRound } from './lib/generateRound'
import { httpMethod, httpRespond, Handler } from './lib/http'
import { transformGame } from './lib/transformGame'
import { updateGame } from './queries/updateGame'

export const handler: Handler = compose(
  httpRespond(),
  httpMethod('POST'),
)((event: APIGatewayEvent) => {
  const {
    id,
    guess
  } = event.queryStringParameters || {}
  if (!id || !guess) {
    throw new Error('INVALID_QUERY_STRING')
  }

  return response({ id, guess })
})

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
