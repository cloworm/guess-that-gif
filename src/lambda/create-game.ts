require('dotenv').config()
import * as faunadb from 'faunadb'
import { APIGatewayEvent, Context } from 'aws-lambda'
import {
  GameInput,
  Round,
} from '../../types'
import {
  generateRound
} from './lib/generateRound'

export async function handler (
  _event: APIGatewayEvent,
  _context: Context
) {
  try {
    const q = faunadb.query

    const adminClient = new faunadb.Client({
      secret: process.env.FAUNADB_SERVER_SECRET || ''
    })

    const game = await createGame()

    const res: any = await adminClient.query(
      q.Create(
        q.Collection('Game'),
        {
          data: game
        }
      )
    )

    return {
      statusCode: 200,
      body: JSON.stringify({
        game: {
          id: res.ref.id,
          score: res.data.score,
          lives: res.data.lives,
          round: {
            words: res.data.round.words,
            giphyUrl: res.data.round.giphyUrl
          }
        }
      })
    }
  } catch(err) {
    return {
      statusCode: 500,
      body: `Error: ${err}`
    }
  }
}

export async function createGame(): Promise<GameInput> {
  const round: Round = await generateRound()

  const game: GameInput = {
    score: 0,
    lives: 3,
    round,
  }

  return game
}
