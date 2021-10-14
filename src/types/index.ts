import ClientUser from '../api/entities/ClientUser'
import Guild from '../api/entities/Guild'
import TextChannel from '../api/entities/TextChannel'
import VoiceChannel from '../api/entities/VoiceChannel'

export type Snowflake = string

export enum Intent {
  GUILDS = 1,
  GUILD_MEMBERS = 2,
  GUILD_BANS = 4,
  GUILD_EMOJIS_AND_STICKERS = 8,
  GUILD_INTEGRATIONS = 16,
  GUILD_WEBHOOKS = 32,
  GUILD_INVITES = 64,
  GUILD_VOICE_STATES = 128,
  GUILD_PRESENCES = 256,
  GUILD_MESSAGES = 512,
  GUILD_MESSAGE_REACTIONS = 1024,
  GUILD_MESSAGE_TYPING = 2048,
  DIRECT_MESSAGES = 4096,
  DIRECT_MESSAGE_REACTIONS = 8192,
  DIRECT_MESSAGE_TYPING = 16384,
}

export default interface ClientOptionContext {
  shardCount?: 1
  messageCacheLifetime?: 0
  messageSweepInterval?: 0
  invalidRequestWarningInterval?: 0
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
  intents: Intent[],
  restWsBridgeTimeout?: 5000
  restRequestTimeout?: 15000
  restGlobalRateLimit?: 0
  retryLimit?: 1
  restTimeOffset?: 500
  restSweepInterval?: 60
  failIfNotExists?: true
  userAgentSuffix?: []
}

export type ShardingMode = 'process' | 'worker'

export type ShardOption = {
  totalShards: 'auto' | number,
  mode: ShardingMode,
  respawn: boolean,
  shardArgs: string[],
  execArgv: any[],
  token: string,
}

export enum Opcode {
  DISPATCH_EVENT = 0,
  HEARTBEAT = 1,
  IDENTIFY = 2,
  PRESENCE_UPDATE = 3,
  VOICE_STATE_UPDATE = 4,
  RESUME = 6,
  RECONNECT = 7,
  REQUEST_GUILD_MEMBER = 8,
  INVALID_SESSION  = 9	,
  HELLO = 10,
  HEARTBEAT_ACK = 11,
}

export type Awaited<T> = T | PromiseLike<T>

export interface MineralVein {
  ready: [client: ClientUser],
  guildCreate: [guild: Guild]
}

export enum ChannelType {
  GUILD_TEXT = 0,
  DM	= 1,
  GUILD_VOICE = 2	,
  GROUP_DM	= 3,
  GUILD_CATEGORY = 4,
  GUILD_NEWS = 5,
  GUILD_STORE = 6,
  GUILD_NEWS_THREAD	= 10,
  GUILD_PUBLIC_THREAD = 11,
  GUILD_PRIVATE_THREAD = 12,
  GUILD_STAGE_VOICE	= 13,
}

export type ChannelResolvable = TextChannel | VoiceChannel