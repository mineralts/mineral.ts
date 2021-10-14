import { Opcode } from '../types'
import Logger from '@leadcodedev/logger'
import SocketManager from './SocketManager'

export default class Heartbeat {
  private scheduler: any
  constructor (private socketManager: SocketManager) {
  }

  public watchSession (sessionId: string) {
    if (sessionId) {
      this.socketManager.socket.client.sessionId = sessionId
    }
  }

  public beat (interval: number) {
    this.scheduler = setInterval(() => {
      const request = this.socketManager.request(Opcode.HEARTBEAT, {
        session_id: this.socketManager.socket.client.sessionId
      })

      this.socketManager.websocket.send(request)
      Logger.send('info', 'Sending a heartbeat')
    }, interval)
  }

  public shutdown () {
    clearInterval(this.scheduler)
  }
}