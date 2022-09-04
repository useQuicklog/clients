import { makeCreateClient } from '../src/client'
import { EventData } from '../src/types'
import { URLS } from '../src/urls'

const fetch = jest.fn()

const options = {
  project: 'test',
  token: 'test-token'
}

describe('Client', () => {
  it('creates client factory functions', () => {
    const { createClient } = makeCreateClient({ fetch, Headers })
    expect(createClient).toBeTruthy()
  })

  it('returns clients', () => {
    const { createClient } = makeCreateClient({ fetch, Headers })
    const client = createClient(options)

    expect(client).toHaveProperty('event')
  })

  it('calls event api url', () => {
    const { createClient } = makeCreateClient({ fetch, Headers })
    const client = createClient(options)

    const data: EventData = {
      channel: 'test-channel',
      event: 'test-event',
      icon: '🤣',
      message: 'Some test message'
    }

    client.event(data)

    const { lastCall } = fetch.mock

    expect(fetch).toBeCalled()
    expect(lastCall[0]).toBe(URLS.event)
    expect(lastCall[1].headers.get('Content-Type')).toBe('application/json')
  })
})
