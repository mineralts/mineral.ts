import { Snowflake } from '../../types'
import User from './User'
import GuildMemberRoleManager from './GuildMemberRoleManager'
import VoiceState from './VoiceState'
import Role from './Role'
import { DateTime } from 'luxon'

export default class GuildMember {
  constructor (
    public id: Snowflake,
    public username: string,
    public user: User,
    public roles: GuildMemberRoleManager,
    public highestRole: Role | null,
    public premiumSince: DateTime | undefined,
    public isPending: boolean,
    public voice: VoiceState | undefined,
    public joinedAt: DateTime,
  ) {
  }
}