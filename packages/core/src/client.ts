import { EventData } from "./types"
import { URLS } from "./urls"

export interface QuicklogClient {
  event: (data: EventData) => Promise<any>
}

export interface ClientOptions {
  token: string
  project: string
}

interface MakeCreateClientDeps {
  fetch: typeof global.fetch
}

export const makeCreateClient = ({ fetch }: MakeCreateClientDeps) => {
  function createClient (opts: ClientOptions): QuicklogClient {

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${opts.token}`
    }

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
