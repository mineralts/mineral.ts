import { Socket } from './Socket'
import axios from 'axios'
import WebSocket from 'ws'
import Logger from '@leadcodedev/logger'
import Heartbeat from './Heartbeat'
import { Opcode } from '../types'
import { Buffer } from 'buffer'
import { Observable } from 'rxjs'
import BasePacket from '../packets/BasePacket'
import RateLimitError from '../reporters/errors/RateLimitError'

export default class SocketManager {
  public websocket!: WebSocket
  private reactor!: Observable<any>
  private heartbeat: Heartbeat

  constructor (public socket: Socket) {
    this.heartbeat = new Heartbeat(this)
  }

  public async connect (request: Buffer) {
    try {
      const { data } = await axios.get('/v9/gateway/bot')
      this.websocket = new WebSocket(`${data.url}/?v=9`)

      this.reactor = new Observable((observer) => {
        this.websocket.on('message', async (data: Buffer) => {
          const payload = JSON.parse(data.toString())
          observer.next(payload)
        })
      })

      this.open(request)
      this.error()
      this.close()
      this.dispatch()
    } catch (err: any) {
      if (err.response.status === 429) {
        new RateLimitError(err.response.data.message, err.response.data.retry_after)
      }
    }
  }

  private dispatch () {
    this.reactor.subscribe(async (payload: any) => {
      this.heartbeat.watchSession(payload.d?.session_id)

      if (payload.op === Opcode.HELLO) {
        this.heartbeat.beat(payload.d.heartbeat_interval)
      }

      if (payload.t) {
        console.log(payload.t)
        const packetEvents = this.socket.client.packetManager.packets.get(payload.t)
        if (!packetEvents) {
          return
        }

        await Promise.all(
          packetEvents.map(async (packet: BasePacket) => (
            packet?.handle(this.socket.client, payload.d)
          ))
        )
      }
    })
  }

  private open (request: Buffer) {
    this.websocket.on('open', () => {
      this.websocket?.send(request)
    })
  }

  private error () {
    this.websocket.on('error', (err: Error) => {
      Logger.send('error', err.message)
      this.heartbeat.shutdown()
    })
  }

  private close () {
    this.websocket.on('close', () => {
      Logger.send('info', 'Closed')
      this.heartbeat.shutdown()
    })
  }

  public request (code: Opcode, payload): Buffer {
    return Buffer.from(
      JSON.stringify({
        op: code,
        d: payload
      })
    )
  }
}