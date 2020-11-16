import * as faunadb from 'faunadb'


export async function getGame(id: string) {
  const q = faunadb.query

  if (!process.env.FAUNADB_SERVER_SECRET) {
    throw new Error('MISSING_FAUNADB_SERVER_SECRET')
  }

  const adminClient = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
  })

  try {
    const res: any = await adminClient.query(
      q.Get(
        q.Ref(q.Collection('Game'), id)
      )
    )

    console.log('res', res)

    return res

  } catch(err) {
    console.log('ERROR_GET_GAME', err)
  }

}
