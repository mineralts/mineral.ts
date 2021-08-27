import EventEmitter from 'events'
import Client from '../client/Client'
import { Opcode, Status } from '../types'
import axios from 'axios'
import WebSocket from 'ws'
import Request from '../websockets/Request'
import Logger from '@leadcodedev/logger'
import Heartbeat from '../client/Heartbeat'

export default class WebSocketManager extends EventEmitter {
  public websocket: WebSocket | undefined
  public status: Status = Status.IDLE
  private heartbeat: Heartbeat

  constructor (public client: Client) {
    super()
    this.heartbeat = new Heartbeat(this.client)
  }

  public async connect (identityPacket: Request<unknown>) {
    const { data } = await axios.get('/v9/gateway/bot')

    this.websocket = new WebSocket(`${data.url}/?v=9`)

    this.websocket.on('open', () => {
      this.websocket?.send(identityPacket.build())
    })

    this.websocket.on('error', (err) => {
      Logger.send('error', err.message)
      this.heartbeat.shutdown()
    })

    this.websocket.on('close', (message) => {
      Logger.send('info', 'Closed')
      this.heartbeat.shutdown()
    })

    this.websocket.on('message', async (message) => {
      const data = JSON.parse(JSON.stringify(message)).data
      const payload = this.convert(new Uint8Array(data))

      this.heartbeat.watchSession(payload.d?.session_id)

      if (payload.op === 10) {
        this.heartbeat.beat(payload.d.heartbeat_interval)
      }

      const packet = this.client.packetManager.packets.get(payload.t)
      await packet?.handle(this.client, payload.d)
    })
  }

  private convert (binary: Uint8Array) {
    let str = ''
    for (let i = 0; i < binary.length; i++) {
      str += String.fromCharCode(parseInt(String(binary[i])));
    }
    return JSON.parse(str)
  }
}