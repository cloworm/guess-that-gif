import * as apiGatewayEventTemplate from '@serverless/event-mocks/dist/events/aws/api-gateway-event-template.json'
import { merge, cloneDeep } from 'lodash'
import { APIGatewayEvent, Context } from 'aws-lambda'

// All the API Gateway Event parameters you can configure are here: https://github.com/serverless/event-mocks/blob/master/lib/events/aws/api-gateway-event-template.json
export function apiGatewayEvent(eventData: Partial<APIGatewayEvent>): APIGatewayEvent {
  return merge(cloneDeep(apiGatewayEventTemplate), eventData) as APIGatewayEvent
}

interface LambdaResponse {
  statusCode: number,
  body: string,
}

interface ParsedResponse {
  statusCode: number,
  body: { [name: string]: any },
}

// Return response after body is JSON-parsed
export function parse(response: LambdaResponse): ParsedResponse {
  const {
    body,
    statusCode,
  } = response

  return {
    body: JSON.parse(body),
    statusCode,
  }
}

// We don't really use context for anything so just passing in an empty object
// seems to work fine for now. If we need a true mock context object consider
// using aws-lambda-mock-context.
// https://github.com/SamVerschueren/aws-lambda-mock-context
export const context: Context = {} as Context
