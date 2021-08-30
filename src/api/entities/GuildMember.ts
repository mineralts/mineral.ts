import { Snowflake } from '../../types'
import CachedRoles from './CachedRoles'
import User from './User'
import Guild from './Guild'

export default class GuildMember {
  constructor (
    public user: User,
    public roles: CachedRoles,
    public guild: Guild | null
  ) {
  }

  public _patch (data: any) {
    this.guild = data.guild
  }
}