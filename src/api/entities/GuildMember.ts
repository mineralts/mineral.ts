import { Snowflake } from '../../types'
import User from './User'
import GuildMemberRoleManager from './GuildMemberRoleManager'
import VoiceState from './VoiceState'
import Role from './Role'
import { DateTime } from 'luxon'
import Guild from './Guild'
import Request from '../../sockets/Request'

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

  public async setUsername (value: string) {
    const request = new Request(`/guilds/${this.guild.id}/members/${this.id}`)
    await request.patch({ nick: value })

    this.username = value
  }
}