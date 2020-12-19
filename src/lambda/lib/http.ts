import { APIGatewayEvent, Context } from 'aws-lambda'

export type Handler = (
  event: APIGatewayEvent,
  context: Context
) => Promise<{
  statusCode: number,
  body: string,
}>

export type InnerHandler = (
  event: APIGatewayEvent,
  context: Context
) => any

export function httpMethod(method: 'GET' | 'POST') {
  return (inner: InnerHandler): InnerHandler => {
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
  return (inner: InnerHandler): Handler => {
    return async (
      event: APIGatewayEvent,
      context: Context
    ): ReturnType<Handler> => {
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
