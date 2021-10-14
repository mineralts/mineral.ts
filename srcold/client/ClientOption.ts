import Collection from '@discordjs/collection'
import { Intent, Snowflake } from '../types'

export default interface ClientOption {
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
