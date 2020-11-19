import * as faunadb from 'faunadb'
import { Game } from '../../../types'

export async function updateGame(id: string, game: Game) {
  const q = faunadb.query

  if (!process.env.FAUNADB_SERVER_SECRET) {
    throw new Error('MISSING_FAUNADB_SERVER_SECRET')
  }

  const adminClient = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
  })

  try {
    const res: any = await adminClient.query(
      q.Update(
        q.Ref(q.Collection('Game'), id),
        { data: game }
      )
    )

    console.log('res', res)

    return res

  } catch(err) {
    console.log('ERROR_GET_GAME', err)
  }

}
