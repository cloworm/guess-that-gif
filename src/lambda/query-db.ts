require('dotenv').config()
import * as faunadb from 'faunadb'
import { APIGatewayEvent, Context } from 'aws-lambda'

export async function handler (
  _event: APIGatewayEvent,
  _context: Context
) {
  try {
    const q = faunadb.query

    const adminClient = new faunadb.Client({
      secret: process.env.FAUNADB_SERVER_SECRET || ''
    })

    console.log('adminClient', adminClient)

    const ret: any = await adminClient.query(
      q.Create(
        q.Collection('games'),
        {
          data: {
            score: 0,
            lives: 3,
            moves: []
          }
        }
      )
    )

    console.log('ret', ret)

    return {
      statusCode: 200,
      body: JSON.stringify({ data: ret.data })
    }
  } catch(err) {
    return {
      statusCode: 500,
      body: `Error: ${err}`
    }
  }
}
