import * as faunadb from 'faunadb'

if (!process.env.FAUNADB_SERVER_SECRET) {
  throw new Error('MISSING_FAUNADB_SERVER_SECRET')
}

export const q = faunadb.query

export const adminClient = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})
