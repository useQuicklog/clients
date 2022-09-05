import { createClient } from '../src'

describe('Entrypoint', () => {
  it('exists', () => {
    expect(createClient).toBeDefined()
  })
})
