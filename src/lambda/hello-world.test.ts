import { getMessage } from './hello-world'

test('getMessage', () => {
  const re = /^Hello world/
  const message = getMessage()
  expect(message).toMatch(re)
})
