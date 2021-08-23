import EventEmitter from 'events'
import Client from '../client/Client'
import { Opcode, Status } from '../types'
import axios from 'axios'
import WebSocket from 'ws'
import { Buffer } from 'buffer'
import Request from '../websockets/Request'
import Logger from '@leadcodedev/logger'

export default class WebSocketManager extends EventEmitter {
  public gateway = null
  public status: Status = Status.IDLE
  public inflate: any = []

  constructor (public client: Client) {
    super()
  }

  public async connect () {
    const { data } = await axios.get('https://discord.com/api/v9/gateway/bot', {
      headers: { 'Authorization': `Bot ${this.client.token}` }
    })

    const websocket = new WebSocket(`${data.url}/?v=9`)
    websocket.on('error', (err) => {
      console.log(err)
    })

    websocket.on('message', (message) => {
      const data = JSON.parse(JSON.stringify(message)).data
      function convert (binary: Uint8Array) {
        let str = ''
        for (let i = 0; i < binary.length; i++) {
          str += String.fromCharCode(parseInt(String(binary[i])));
        }
        return JSON.parse(str)
      }
      console.log(convert(new Uint8Array(data)))
    })

    websocket.on('open', () => {
      const identify = new Request(Opcode.IDENTIFY, {
        token: this.client.token,
        properties: {
          $os: process.arch,
        },
        compress: false,
        large_threshold: 250,
        intents: 32509
      })
      Logger.send('info', 'Socket connected')
      websocket.send(identify.build())
    })
  }
}