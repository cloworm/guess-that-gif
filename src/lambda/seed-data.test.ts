import { WordSet } from '../../types'
import {
  getHomophonePage,
  createData,
  response,
} from './seed-data'
import { apiGatewayEvent } from './testing/apiGatewayEvent'

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

test('response', async () => {
  const { count } = await response(event)
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
