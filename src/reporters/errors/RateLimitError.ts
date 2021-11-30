import Error from './Error'

export default class RateLimitError extends Error {
  constructor (message: string, retryAfter) {
    super('error', `${message}. Please retry in ${Math.round(retryAfter / 1000)} seconds.`)
  }
}