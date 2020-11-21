import { APIGatewayEvent, Context } from 'aws-lambda'

export type Handler = (
  event: APIGatewayEvent,
  context: Context
) => any

export type HttpResponder = (
  event: APIGatewayEvent,
  context: Context
) => Promise<{
  statusCode: number,
  body: string,
}>

export function httpMethod(method: 'GET' | 'POST') {
  return (inner: Handler): Handler => {
    return (
      event: APIGatewayEvent,
      context: Context
    ) => {
      if (event.httpMethod !== method) throw new Error(`HTTP method '${method}' is required.`)

      return inner(event, context)
    }
  }
}

export function httpRespond () {
  return (inner: Handler): HttpResponder => {
    return async (
      event: APIGatewayEvent,
      context: Context
    ): ReturnType<HttpResponder> => {
      try {
        return {
          statusCode: 200,
          body: JSON.stringify(await inner(event, context))
        }
      } catch(err) {
        return {
          statusCode: 500,
          body: `Error: ${err.name} – ${err.message} \n${err.stack}`
        }
      }
    }
  }
}
