import Request from '../websockets/Request'
import { Opcode } from '../types'
import Client from './Client'
import Logger from '@leadcodedev/logger'

export default class Heartbeat {
  private scheduler: any
  constructor (private client: Client) {
  }

  public watchSession (sessionId: string) {
    if (sessionId) {
      this.client.sessionId = sessionId
    }
  }

  public beat (interval: number) {
    this.scheduler = setInterval(() => {
      const request = new Request(Opcode.HEARTBEAT, {
        session_id: this.client.sessionId
      })

      this.client.webSocketManager.websocket?.send(request.build())
      Logger.send('info', 'Sending a heartbeat')
    }, interval)
  }

  public shutdown () {
    clearInterval(this.scheduler)
  }
}