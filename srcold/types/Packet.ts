import { Snowflake } from './index'

export type User = {
  id: Snowflake
  username: string
  avatar: string | null
  email: string | null
  flags: number
  verified: boolean
  discriminator: string
  mfa_enabled: boolean
  premium_since: Date,
  bot: boolean
}

export type Ready = {
  user: User
  geoOrderedRtcRegion: string[]
  v: number
  guilds: {
    id: Snowflake,
    unavailable: boolean
  }[]
  application: {
    id: Snowflake,
    flags: number,
  }
}