import { EventData } from "./types"
import { URLS } from "./urls"

export interface QuicklogClient {
  event: (data: EventData) => Promise<any>
}

export interface ClientOptions {
  token: string
  project: string
}

export const makeCreateClient = (fetch: typeof global.fetch) => {
  function createClient (opts: ClientOptions): QuicklogClient {

    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${opts.token}`
    })

    function event (data: EventData) {
      return fetch(URLS.event, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
      })
    }

    return {
      event
    }
  }

  return { createClient }
}
