require('dotenv').config()
import * as faunadb from 'faunadb'
import { APIGatewayEvent, Context } from 'aws-lambda'
import {
  GameInput,
  Round,
} from '../../types'

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

    const ret: any = await adminClient.query(
      q.Create(
        q.Collection('Game'),
        {
          data: game
        }
      )
    )

    console.log('ret', ret)

    return {
      statusCode: 200,
      body: JSON.stringify({
        game: {
          id: ret.ref.id,
          ...ret.data
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
  const round: Round = {
    words: ['coarse', 'course', 'corse'],
    giphyUrl: 'https://media.giphy.com/media/zwOgFlmzF98sM/giphy.gif'
  }

  const game: GameInput = {
    score: 0,
    lives: 3,
    round,
  }

  return game
}
