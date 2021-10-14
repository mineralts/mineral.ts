import { Snowflake } from '../../types'
import Collection from '@discordjs/collection'
import GuildMember from './GuildMember'

export default class GuildMemberManager {
  public cache: Collection<Snowflake, GuildMember> = new Collection()
  public register (guildMembers: GuildMember[]) {
    guildMembers.forEach((guildMember: GuildMember) => {
      this.cache.set(guildMember.id, guildMember)
    })
    return this
  }
}