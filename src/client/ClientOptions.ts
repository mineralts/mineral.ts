import Collection from '@discordjs/collection'
import { Snowflake } from '../types'

export default class ClientOptions {
  public shardCount = 1
  public messageCacheLifetime = 0
  public messageSweepInterval = 0
  public invalidRequestWarningInterval = 0
  public partials = ['MESSAGE', 'CHANNEL', 'REACTION']
  public restWsBridgeTimeout = 5000
  public restRequestTimeout = 15000
  public restGlobalRateLimit = 0
  public retryLimit = 1
  public restTimeOffset = 500
  public restSweepInterval = 60
  public failIfNotExists = true
  public userAgentSuffix = []
  public presence = {}

  public ws = {
    large_threshold: 50,
    compress: false,
    properties: {
      $os: process.platform,
      $browser: 'discord.js',
      $device: 'discord.js',
    },
    version: 9,
  }

  public http = {
    agent: {},
    version: 9,
    api: 'https://discord.com/api',
    cdn: 'https://cdn.discordapp.com',
    invite: 'https://discord.gg',
    template: 'https://discord.new',
  }
}
