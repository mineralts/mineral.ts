import axios, { AxiosResponse } from 'axios'
import Logger from '@leadcodedev/logger'
import { RequestOptions } from '../types'
import RateLimit from '../api/entities/RateLimit'
import { DateTime } from 'luxon'
import Context from '../Context'

export default class Request {
  constructor (private endpoint: string) {
  }

  public async post<P> (payload: P, options?: RequestOptions): Promise<AxiosResponse<any> | undefined> {
    try {
      return await axios.post(this.endpoint, payload)
    } catch (err) {
      // console.error(err)
      this.retryOnRateLimit(err, async () => await this.post(payload, options))
    }
  }

  public async update<P> (payload: P = {} as P, options?: RequestOptions): Promise<AxiosResponse<any> | undefined> {
    try {
      return await axios.put(this.endpoint, payload)
    } catch (err) {
      // console.error(err)
      this.retryOnRateLimit(err, async () => await this.update(payload, options))
    }
  }

  public async patch<P> (payload: P = {} as P, options?: RequestOptions): Promise<AxiosResponse<any> | undefined> {
    try {
      return await axios.patch(this.endpoint, payload)
    } catch (err) {
      // console.error(err)
      this.retryOnRateLimit(err, async () => await this.patch(payload, options))
    }
  }

  public async delete (options?: RequestOptions):  Promise<void>{
    try {
      await axios.delete(this.endpoint)
    } catch (err) {
      // console.error(err)
      this.retryOnRateLimit(err, async () => await this.delete(options))
    }
  }

  private retryOnRateLimit (err, fn: () => Promise<AxiosResponse<any> | undefined | void>, options?: RequestOptions) {
    const error = err.response.data
    if ('retry_after' in error) {
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