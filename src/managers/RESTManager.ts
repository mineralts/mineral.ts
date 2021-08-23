import Client from '../client/Client'

export default class RESTManager {
  constructor (public readonly client: Client) {
  }

  public getAuth () {
    const token = this.client.token
    if (token) return `Bot ${token}`
    throw new Error('TOKEN_MISSING')
  }
}