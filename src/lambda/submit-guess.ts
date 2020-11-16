require('dotenv').config()
import { APIGatewayEvent, Context } from 'aws-lambda'

import { getGame } from './queries/getGame'
import { Game } from '../../types'

export async function handler (
  event: APIGatewayEvent,
  _context: Context
) {
  try {
    const {
      id,
      guess
    } = event.queryStringParameters || {}
    if (!id || !guess) {
      throw new Error('INVALID_QUERY_STRING')
    }

    const game = await fetchGame(id)
    const updatedGame = await submitGuess(game, guess)

    return {
      statusCode: 200,
      body: JSON.stringify({
        updatedGame
      })
    }
  } catch(err) {
    return {
      statusCode: 500,
      body: `Error: ${err}`
    }
  }
}

export async function fetchGame(id: string) {
  return (await getGame(id)).data
}

export function submitGuess(game: Game, guess: string) {
  // checkGuess => T/F & currentGame ??
  const isCorrect = guess === game.round.correctWord

  // get new round & adds last response to round history
  // updateCurrentGame w/ score, lives,
}
