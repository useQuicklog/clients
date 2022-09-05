import { makeCreateClient, EventData, URLS, ClientOptions } from '../src'

const mockFetchJson = jest.fn()
const mockFetchImpl = async function (s: RequestInfo | URL, init?: RequestInit) {
  return { json: mockFetchJson, ok: true } as any
}
const fetch = jest.fn(mockFetchImpl)

const options: ClientOptions = {
  project: 'test',
  token: 'test-token'
}

describe('Client', () => {
  it('creates client factory functions', () => {
    const { createClient } = makeCreateClient({ fetch })
    expect(createClient).toBeTruthy()
  })

  it('returns clients', () => {
    const { createClient } = makeCreateClient({ fetch })
    const client = createClient(options)

    expect(client).toHaveProperty('event')
  })

  it('calls event api url', async () => {
    const { createClient } = makeCreateClient({ fetch })
    const client = createClient(options)

    const data: EventData = {
      channel: 'test-channel',
      event: 'test-event',
      icon: '🤣',
      message: 'Some test message'
    }

    const thenFn = jest.fn()
    const catchFn = jest.fn()

    await client.event(data).then(thenFn).catch(catchFn)

    const { lastCall } = fetch.mock

    expect(fetch).toBeCalled()
    expect(lastCall[0]).toBe(URLS.event)
    /* @ts-ignore */
    expect(lastCall[1].headers['Content-Type']).toBe('application/json')
    expect(thenFn).toHaveBeenCalled()
    expect(catchFn).not.toHaveBeenCalled()
    expect(mockFetchJson).toHaveBeenCalled()
  })
})
