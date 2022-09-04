import { clientFactory } from '../src/client'
import { EventData } from '../src/types'
import { URLS } from '../src/urls'

const fetch = jest.fn()

const options = {
  project: 'test',
  token: 'test-token'
}

describe('Client', () => {
  it('creates client factory functions', () => {
    const client = clientFactory(fetch)
    expect(client).toBeTruthy()
  })

  it('returns clients', () => {
    const makeClient = clientFactory(fetch)
    const client = makeClient(options)
    expect(client).toHaveProperty('event')
  })

  it('calls event api url', () => {
    const makeClient = clientFactory(fetch)
    const client = makeClient(options)
    const data: EventData = {
      channel: 'test-channel',
      event: 'test-event',
      icon: '🤣',
      message: 'Some test message'
    }

    client.event(data)

    expect(fetch).toBeCalled()
    const { lastCall } = fetch.mock
    expect(lastCall[0]).toBe(URLS.event)
    expect(lastCall[1].headers.get('Content-Type')).toBe('application/json')
  })
})
