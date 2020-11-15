import {
  getHomophonePage,
  createData
} from './seed-data'

const list = [{
  id: 1,
  words: [{
    text: 'course'
  }]
}, {
  id: 2,
  words: [{
    text: 'corse'
  }]
}, {
  id: 3,
  words: [{
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

test('createData', async () => {
  const res = await createData(list)
  expect(res).toHaveLength(3)
  expect(res).toHaveProperty('index')
  expect(res[0]).toHaveProperty('words')
})

test('getHomophonePage', async () => {
  const res = await getHomophonePage(1)
  expect(res).toHaveLength(3)
})
