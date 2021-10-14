import axios, { AxiosResponse } from 'axios'

export default class Request {
  constructor (private endpoint: string) {
  }

  public async post<P> (payload: P): Promise<AxiosResponse<any> | undefined> {
    try {
      return await axios.post(this.endpoint, payload)
    } catch (err) {
      console.error(err.response.data.components[0])
    }
  }

  public async update<P> (payload: P = {} as P): Promise<AxiosResponse<any> | undefined> {
    try {
      return await axios.put(this.endpoint, payload)
    } catch (err) {
      console.error(err)
    }
  }

  public async delete ():  Promise<void>{
    try {
      await axios.delete(this.endpoint)
    } catch (err) {
      console.error(err)
    }
  }
}