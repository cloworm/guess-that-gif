import * as faunadb from 'faunadb'

export async function getRandomWordSet() {
  const q = faunadb.query
  const adminClient = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET || ''
  })

  const maxEid = 18
  let match: any

  // return helper
  for (let i = 0; i < 50; i++) {
    const random = Math.floor(Math.random() * maxEid) + 1
    console.log('random', random)
    let res: any
    try {
      res = await adminClient.query(
        q.Get(
          q.Match(q.Index('eid'), random)
        )
      )
    } catch(err) {
      console.log('err', err)
    }

    console.log('res', res)

    if (res?.data?.words?.length > 0) {
      match = res
      break
    }
  }

  if (!match) {
    throw new Error('NO_WORDSET_FOUND')
  }

  return match
}
