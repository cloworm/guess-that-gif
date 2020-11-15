import { WordSet } from '../../types'
import {
  getHomophonePage,
  createData,
} from './seed-data'

const list = [{
  id: 1,
  words: [{
    text: 'course'
  }, {
    text: 'corse'
  }, {
    text: 'coarse'
  }]
}]

jest.mock(('./lib/fetchJson.ts'), () => {
  return {
    fetchJson: () => {
      return Promise.resolve(list)
    }
  }
})

jest.mock('./queries/createDoc.ts', () => {
  return {
    createDoc: (set: WordSet) => {
      return Promise.resolve(set)
    }
  }
})

test('createData', async () => {
  const res = await createData(list)
  expect(res).toHaveLength(1)
  expect(res[0]).toHaveProperty('words')
})

test('getHomophonePage', async () => {
  const res = await getHomophonePage(1)
  expect(res).toHaveLength(1)
})
