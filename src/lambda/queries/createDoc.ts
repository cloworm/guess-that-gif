import { WordSet } from '../../../types'
import * as faunadb from 'faunadb'

export async function createDoc(set: WordSet) {
  const q = faunadb.query
  const adminClient = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET || ''
  })

  return await adminClient.query(
    q.Create(
      q.Collection('WordSet'),
      {
        data: set
      }
    )
  )
}
