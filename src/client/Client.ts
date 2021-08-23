import BaseClient from './BaseClient'
import WebSocketManager from '../managers/WebSocketManager'

export default class Client extends BaseClient {
  public webSocketManager: WebSocketManager = new WebSocketManager(this)
  constructor (public token: string, public options: any) {
    super(options)
  }

  public async login () {
    if (!this.token) {
      throw new Error('TOKEN_INVALID')
    }
    await this.webSocketManager.connect()
  }
}