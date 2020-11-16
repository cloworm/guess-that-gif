require('dotenv').config()
import { APIGatewayEvent, Context } from 'aws-lambda'

import { getGame } from './queries/getGame'
import { Game } from '../../types'
import { generateRound } from './lib/generateRound'
import { updateGame } from './queries/updateGame'

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
    const updatedGame = await submitGuess(id, game, guess)

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

export async function submitGuess(id: string, game: Game, guess: string) {
  // checkGuess => T/F & currentGame ??
  const isCorrect = guess === game.round.correctWord
  const round = await generateRound()
  const oldRound = {
    ...game.round,
    wasCorrect: isCorrect,
    guessedWord: guess
  }

  const updatedGame = {
    score: isCorrect ? game.score + 1 : game.score,
    lives: isCorrect ? game.lives : game.lives - 1,
    round: round,
    roundHistory: game.roundHistory ? [...game.roundHistory, oldRound] : [oldRound]
  }

  return await updateGame(id, updatedGame)
  // get new round & adds last response to round history
  // updateCurrentGame w/ score, lives,
}
