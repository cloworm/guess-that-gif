require('dotenv').config()
import * as faunadb from 'faunadb'
import { APIGatewayEvent, Context } from 'aws-lambda'

export async function handler (
  _event: APIGatewayEvent,
  _context: Context
) {
  try {

  } catch(err) {
    return {
      statusCode: 500,
      body: `Error: ${err}`
    }
  }
}

export async function seedData() {

}
