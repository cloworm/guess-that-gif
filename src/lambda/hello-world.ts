import { APIGatewayEvent, Context } from 'aws-lambda'

export async function handler (
  _event: APIGatewayEvent,
  _context: Context
) {

  return {
    statusCode: 200,
    body: JSON.stringify({ message: getMessage() })
  }
}

export function getMessage() {
  return `Hello world ${Math.floor(Math.random() * 10)}`
}
