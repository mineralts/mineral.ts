import axios from 'axios'
import Logger from '@leadcodedev/logger'
import { RequestOptions } from '../types'
import RateLimit from '../api/entities/RateLimit'
import { DateTime } from 'luxon'
import Context from '../Context'

export default class Request {
  constructor (private endpoint: string) {
  }

  public async get<P> (options?: RequestOptions): Promise<any | undefined> {
    try {
      const { data } = await axios.get(this.endpoint)
      return data
    } catch (err) {
      // console.error(err.response)
      this.retryOnRateLimit(err, async () => await this.get(options))
      return false
    }
  }

  public async post<P> (payload?: P, options?: RequestOptions): Promise<any | undefined> {
    try {
      const { data } = await axios.post(this.endpoint, payload)
      return data
    } catch (err) {
      // console.error(err.response)
      this.retryOnRateLimit(err, async () => await this.post(payload, options))
      return false
    }
  }

  public async update<P> (payload: P = {} as P, options?: RequestOptions): Promise<boolean | undefined> {
    try {
      const { data } = await axios.put(this.endpoint, payload)
      return data
    } catch (err) {
      // console.error(err)
      this.retryOnRateLimit(err, async () => await this.update(payload, options))
      return false
    }
  }

  public async patch<P> (payload: P = {} as P, options?: RequestOptions): Promise<any | undefined> {
    try {
      const { data } = await axios.patch(this.endpoint, payload)
      return data
    } catch (err) {
      // console.error(err)
      this.retryOnRateLimit(err, async () => await this.patch(payload, options))
      return false
    }
  }

  public async delete (options?: RequestOptions):  Promise<boolean> {
    try {
      return axios.delete(this.endpoint)
    } catch (err) {
      // console.error(err)
      this.retryOnRateLimit(err, async () => await this.delete(options))
      return false
    }
  }

  protected retryOnRateLimit (err, fn: () => Promise<boolean | undefined | void>, options?: RequestOptions) {
    if (!err.response?.data) {
      return
    }

    if ('retry_after' in err.response.data) {
      const error = err.response.data
      Logger.send('warn', `${error.message}. Please retry in ${Math.round(error.retry_after / 1000)} seconds.`)

      const client = Context.getClient()
      client.emit('rateLimit', new RateLimit(
        error.message,
        DateTime.fromMillis(error.retry_after),
        error.global,
      ))

      if (options?.retryOnRateLimit) {
        setTimeout(fn, error.retry_after + 1)
      }
    }

  }
}