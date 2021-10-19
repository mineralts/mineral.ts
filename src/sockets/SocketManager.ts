import { Socket } from './Socket'
import axios from 'axios'
import WebSocket from 'ws'
import Logger from '@leadcodedev/logger'
import Heartbeat from './Heartbeat'
import { Opcode } from '../types'
import { Buffer } from 'buffer'

export default class SocketManager {
  public websocket!: WebSocket
  private heartbeat: Heartbeat

  constructor (public socket: Socket) {
    this.heartbeat = new Heartbeat(this)
  }

  public async connect (request: Buffer) {
    const { data } = await axios.get('/v9/gateway/bot')

    this.websocket = new WebSocket(`${data.url}/?v=9`)

    this.websocket.on('open', () => {
      this.websocket?.send(request)
    })

    this.websocket.on('error', (err: Error) => {
      Logger.send('error', err.message)
      this.heartbeat.shutdown()
    })

    this.websocket.on('close', () => {
      Logger.send('info', 'Closed')
      this.heartbeat.shutdown()
    })

    this.websocket.on('message', async (message: Buffer) => {
      const payload = JSON.parse(message.toString())


      // const debug = this.socket.client.packetManager.packets.get('debug')
      // await debug![0].handle(this.socket.client, payload)

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
          packetEvents.map(async (packet) => (
            packet?.handle(this.socket.client, payload.d)
          ))
        )
      }
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