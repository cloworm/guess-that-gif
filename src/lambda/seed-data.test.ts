import { WordSet } from '../../types'
import {
  getHomophonePage,
  createData,
  handler,
} from './seed-data'
import { apiGatewayEvent, context, parse } from './testing'

const event = apiGatewayEvent(
  {
    httpMethod: 'GET',
    queryStringParameters: {
      pageNum: '1',
    }
  }
)

const list = [
  {
    id: 1,
    words: [{
      text: 'course'
    }, {
      text: 'corse'
    }, {
      text: 'coarse'
    }]
  },
  {
    id: 2,
    words: [{
      text: 'horse'
    }, {
      text: 'hoarse'
    }]
  },
]

jest.mock(('./lib/fetchJson'), () => {
  return {
    fetchJson: () => {
      return Promise.resolve(list)
    }
  }
})

jest.mock('./queries/createDoc', () => {
  return {
    createDoc: (set: WordSet) => {
      return Promise.resolve(set)
    }
  }
})

test('only supports GET requests', async () => {
  const { statusCode, body } = await handler(apiGatewayEvent({ httpMethod: 'POST' }), context)
  expect(statusCode).toBe(500)
  expect(body).toContain("HTTP method 'GET' is required")
})

test('responds with the count of records created', async () => {
  const { statusCode, body: { count } } = parse(await handler(event, context))
  expect(statusCode).toBe(200)
  expect(count).toBe(2)
})

test('createData', async () => {
  const res = await createData(list)
  expect(res).toHaveLength(2)
  expect(res[0]).toHaveProperty('words')
})

test('getHomophonePage', async () => {
  const res = await getHomophonePage(1)
  expect(res).toHaveLength(2)
})
