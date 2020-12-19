import * as faunadb from 'faunadb'
import { Game, GameQueryResult } from '../../../types'

export function updateGame(id: string, game: Game): Promise<GameQueryResult> {
  const q = faunadb.query

  if (!process.env.FAUNADB_SERVER_SECRET) {
    throw new Error('MISSING_FAUNADB_SERVER_SECRET')
  }

  const adminClient = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
  })

  return adminClient.query(
    q.Update(
      q.Ref(q.Collection('Game'), id),
      { data: game }
    )
  )
}
