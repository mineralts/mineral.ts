import User from './User'
import Role from '../entities/Role'
import Cache from './Cache'
import Guild from './Guild'
import { Snowflake } from '../../types'
import VoiceChannel from '../entities/channels/VoiceChannel'

export default interface GuildMember {
  user: User
  roles: Cache<Role>
  guild: Cache<Guild>
  sessionId: Snowflake,
  isDeaf: boolean
  isMute: boolean
  isSelfDeaf: boolean
  isSelfMute: boolean
  isSelfStream: boolean
  isSelfVideo: boolean
  isSuppress: boolean
  voiceChannel: VoiceChannel
}