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

    this.websocket.on('error', (err) => {
      Logger.send('error', err.message)
      this.heartbeat.shutdown()
    })

    this.websocket.on('close', () => {
      Logger.send('info', 'Closed')
      this.heartbeat.shutdown()
    })

    this.websocket.on('message', async (message) => {
      const data = JSON.parse(JSON.stringify(message)).data
      const payload = this.convert(new Uint8Array(data))

      // console.log(payload.t)

      // const debug = this.socket.client.packetManager.packets.get('debug')
      // await debug![0].handle(this.socket.client, payload)

      this.heartbeat.watchSession(payload.d?.session_id)

      if (payload.op === 10) {
        this.heartbeat.beat(payload.d.heartbeat_interval)
      }


      if (payload.t) {
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

  protected convert (binary: Uint8Array) {
    let str = ''
    for (let i = 0; i < binary.length; i++) {
      str += String.fromCharCode(parseInt(String(binary[i])));
    }
    return JSON.parse(str)
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