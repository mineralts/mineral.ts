import BaseClient from './BaseClient'
import WebSocketManager from '../managers/WebSocketManager'
import Request from '../websockets/Request'
import { Opcode } from '../types'
import Logger from '@leadcodedev/logger'
import PacketManager from '../managers/PacketManager'
import ChannelManager from '../managers/ChannelManager'
import CacheManager from '../managers/CacheManager'
import ClientOptions from './ClientOptions'
import axios from 'axios'
import RESTManager from '../managers/RESTManager'
import MemberManager from '../managers/MemberManager'
import RoleManager from '../managers/RoleManager'

export default class Client extends BaseClient {
  public webSocketManager: WebSocketManager = new WebSocketManager(this)
  public packetManager: PacketManager = new PacketManager()
  public cacheManager: CacheManager = new CacheManager()
  public channelManager: ChannelManager = new ChannelManager(this)
  public memberManager: MemberManager = new MemberManager(this)
  public roleManager: RoleManager = new RoleManager(this)
  public restManager: RESTManager = new RESTManager(this)
  public sessionId: string | null = null
  public cdnUrl: string = 'https://cdn.discordapp.com'
  public inviteUrl: string = 'https://discord.gg'
  public templateUrl = 'https://discord.new'

  constructor (public token: string, public options: ClientOptions) {
    super(options)
    axios.defaults.baseURL = 'https://discord.com/api'
    axios.defaults.headers.common['Authorization'] =  `Bot ${this.token}`
  }

  public async login () {
    if (!this.token) {
      throw new Error('TOKEN_INVALID')
    }

    const identify = new Request(Opcode.IDENTIFY, {
      token: this.token,
      properties: {
        $os: process.arch,
      },
      compress: false,
      large_threshold: 250,
      intents: 32767
    })

    await this.webSocketManager.connect(identify)
    Logger.send('info', 'The discord client is connected')
  }
}