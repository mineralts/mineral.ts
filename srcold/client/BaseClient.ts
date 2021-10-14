import EventEmitter from 'events'
import RESTManager from '../managers/RESTManager'
import Client from './Client'
import ClientOption from './ClientOption'

export default class BaseClient extends EventEmitter {
  public rest: RESTManager
  constructor (option: ClientOption) {
    super()
    this.rest = new RESTManager(this as unknown as Client)
  }
}