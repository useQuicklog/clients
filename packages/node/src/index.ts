import { makeCreateClient } from '@usequicklog/core'
import { fetch as undiciFetch } from 'undici'

export const createClient = makeCreateClient({
  fetch: fetch ?? undiciFetch
})
