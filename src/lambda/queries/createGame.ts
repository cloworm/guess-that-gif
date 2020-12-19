import {
  GameInput,
  GameQueryResult,
} from '../../../types'

import * as faunadb from 'faunadb'

export function createGame(data: GameInput): Promise<GameQueryResult> {
  const q = faunadb.query

  const adminClient = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET || ''
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
