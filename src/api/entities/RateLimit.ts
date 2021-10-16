import { DateTime } from 'luxon'

export default class RateLimit {
  constructor (
    public message: string,
    public retryAfter: DateTime,
    public isGlobal: boolean,
  ) {
  }
}