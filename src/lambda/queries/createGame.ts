import {
  GameInput,
  GameQueryResult,
} from '../../../types'

import * as faunadb from 'faunadb'

export function createGame(data: GameInput): Promise<GameQueryResult> {
  const q = faunadb.query

  if (!process.env.FAUNADB_SERVER_SECRET) {
    throw new Error('MISSING_FAUNADB_SERVER_SECRET')
  }

  const adminClient = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
  })

  return adminClient.query<GameQueryResult>(
    q.Create(
      q.Collection('Game'),
      {
        data,
      }
    )
  )
}
