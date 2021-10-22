import { Snowflake } from '../../types'
import User from './User'
import GuildMemberRoleManager from './GuildMemberRoleManager'
import VoiceState from './VoiceState'
import Role from './Role'
import { DateTime } from 'luxon'
import Guild from './Guild'

export default class GuildMember {
  constructor (
    public id: Snowflake,
    public username: string,
    public user: User,
    public guild: Guild,
    public roles: GuildMemberRoleManager,
    public highestRole: Role | null,
    public isPending: boolean,
    public voice: VoiceState | undefined,
    public joinedAt: DateTime,
  ) {
  }
}