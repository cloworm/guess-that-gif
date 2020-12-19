import * as faunadb from 'faunadb'
import { GameQueryResult } from '../../../types'

export function getGame(id: string): Promise<GameQueryResult> {
  const q = faunadb.query

  if (!process.env.FAUNADB_SERVER_SECRET) {
    throw new Error('MISSING_FAUNADB_SERVER_SECRET')
  }

  const adminClient = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
  })

  return adminClient.query(
    q.Get(
      q.Ref(q.Collection('Game'), id)
    )
  )
}
