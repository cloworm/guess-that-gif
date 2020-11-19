import * as apiGatewayEventTemplate from '@serverless/event-mocks/dist/events/aws/api-gateway-event-template.json'
import { merge, cloneDeep } from 'lodash'
import { APIGatewayEvent } from 'aws-lambda'

// All the API Gateway Event parameters you can configure are here: https://github.com/serverless/event-mocks/blob/master/lib/events/aws/api-gateway-event-template.json
export function apiGatewayEvent(eventData: Partial<APIGatewayEvent>): APIGatewayEvent {
  return merge(cloneDeep(apiGatewayEventTemplate), eventData) as APIGatewayEvent
}
