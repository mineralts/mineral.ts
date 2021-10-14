import Client from '../client/Client'
import User from '../rest/User'
import Cdn from '../rest/Cdn'

export default class RESTManager {
  public user: User
  public cdn: Cdn
  constructor (public readonly client: Client) {
    this.user = new User(client)
    this.cdn = new Cdn(client)
  }


}