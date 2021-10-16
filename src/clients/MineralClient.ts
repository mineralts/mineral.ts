import ClientOption from './ClientOption'
import ClientOptionContext, { Awaited, Intent, MineralVein, Opcode } from '../types'
import ClientUser from '../api/entities/ClientUser'
import PacketManager from '../packets/PacketManager'
import { Socket } from '../sockets/Socket'
import axios from 'axios'
import Rest from '../Rest'
import EventEmitter from 'events'
import CacheManager from '../caches/CacheManager'
import Context from '../Context'

export default class MineralClient extends EventEmitter {
  public readonly clientOptions: ClientOption
  public sessionId: string | null = null
  public clientUser: ClientUser | undefined
  public packetManager: PacketManager = new PacketManager()
  public cacheManager: CacheManager = new CacheManager(this)
  public socket: Socket = new Socket(this)
  public rest: Rest = Rest.getInstance()

  constructor (token: string, options: ClientOption)
  constructor (token: string, options: ClientOptionContext)
  constructor (public token: string, options: ClientOption | ClientOptionContext) {
    super()

    axios.defaults.baseURL = 'https://discord.com/api'
    axios.defaults.headers.common['Authorization'] =  `Bot ${this.token}`

    if (options instanceof ClientOption) {
      this.clientOptions = options
    } else {
      this.clientOptions = new ClientOption(options)
    }
  }

  public async login () {
    if (!this.token) {
      throw new Error('TOKEN_INVALID')
    }

    const intent = this.clientOptions.options.intents
      ? this.clientOptions.options.intents === 'ALL'
        ? Intent[this.clientOptions.options.intents]
        : this.clientOptions.options.intents.reduce((acc: number, current: keyof typeof Intent) => acc + Intent[current], 0)
      : 0

    const request = this.socket.socketManager.request(Opcode.IDENTIFY, {
      ...this.clientOptions,
      token: this.token,
      properties: {
        $os: process.arch,
      },
      compress: false,
      large_threshold: 250,
      intents: intent
    })

    Context.init(this)
    await this.socket.socketManager.connect(request)
  }

  public on<Gem extends keyof MineralVein>(gem: Gem, listener: (...args: MineralVein[Gem]) => Awaited<void>): this
  public on<Gem extends string | symbol>(gem: Exclude<Gem, keyof MineralVein>, listener: (...args: any[]) => Awaited<void>): this {
    super.on(gem, async (...args) => {
      await listener(...args)
    })
    return this
  }

  public emit<Gem extends keyof MineralVein>(gem: Gem, ...args: MineralVein[Gem])
  public emit<Gem extends string | symbol>(gem: Exclude<Gem, keyof MineralVein>, ...args: unknown[]) {
    super.emit(gem, ...args)
  }
}