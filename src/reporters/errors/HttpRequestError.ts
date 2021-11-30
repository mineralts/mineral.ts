import Error from './Error'

export default class HttpRequestError extends Error {
  constructor (message: string) {
    super('error', message)
  }
}