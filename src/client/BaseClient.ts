import EventEmitter from 'events'
import RESTManager from '../managers/RESTManager'
import Client from './Client'
import ClientOptions from './ClientOptions'

export default class BaseClient extends EventEmitter {
  public rest: RESTManager
  constructor (option: ClientOptions) {
    super()
    this.rest = new RESTManager(this as unknown as Client)
  }
}