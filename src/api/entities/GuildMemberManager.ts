import { Snowflake } from '../../types'
import GuildMember from './GuildMember'
import Collection from '../../Collection'

export default class GuildMemberManager {
  public cache: Collection<Snowflake, GuildMember> = new Collection()

  public register (guildMembers: Collection<Snowflake, GuildMember>) {
    this.cache = guildMembers
    return this
  }
}