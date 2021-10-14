import Collection from '@discordjs/collection'
import Role from './Role'
import { Snowflake } from '../../types'

export default class GuildMemberRoleManager {
  public cache: Collection<Snowflake, Role> = new Collection()

  public register (roles: Role[]) {
    roles.forEach((role: Role) => {
      this.cache.set(role.id, role)
    })
    return this
  }
}