import { APIGatewayEvent, Context } from 'aws-lambda'

export type Handler = (
  event: APIGatewayEvent,
  context: Context
) => Promise<{
  statusCode: number,
  body: string,
}>

export function httpMethod(method: 'GET' | 'POST', inner: Handler): Handler {
  return (
    event: APIGatewayEvent,
    context: Context
  ) => {
    if (event.httpMethod !== method) throw new Error(`HTTP method '${method}' is required.`)

    return inner(event, context)
  }
}
