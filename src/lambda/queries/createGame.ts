import {
  GameInput,
} from '../../../types'

import * as faunadb from 'faunadb'

export function createGame(data: GameInput) {
  const q = faunadb.query

  const adminClient = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET || ''
  })

  return adminClient.query(
    q.Create(
      q.Collection('Game'),
      {
        data,
      }
    )
  )
}
