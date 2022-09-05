import { EventData } from "./types"
import { URLS } from "./urls"

export interface QuicklogClient {
  event: (data: EventData) => Promise<unknown>
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

    async function event (data: EventData) {
      const res = await fetch(URLS.event, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
      })

      if (!res.ok) throw new Error(res.statusText)

      return res.json()
    }

    return {
      event
    }
  }

  return { createClient }
}
