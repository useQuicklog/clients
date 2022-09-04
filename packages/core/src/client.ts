import { EventData } from "./types"
import { URLS } from "./urls"

export interface QuicklogClient {
  event: (data: EventData) => Promise<any>
}

export interface ClientOptions {
  token: string
  project: string
}

export const clientFactory = (fetch: typeof global.fetch) => {
  return function client (opts: ClientOptions): QuicklogClient {

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
}
