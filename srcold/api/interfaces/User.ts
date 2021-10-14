import { Snowflake } from '../../types'

export default interface User {
  id: Snowflake
  username: string
  avatar: string | null
  email: string | null
  flags: number
  isVerified: boolean
  discriminator: string
  hasMfaEnabled: boolean
  isBot: boolean
}