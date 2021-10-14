import { Snowflake } from '../../types'
import Collection from '@discordjs/collection'
import Role from './Role'

export default class GuildRoleManager {
  public cache: Collection<Snowflake, Role> = new Collection()

  constructor () {
  }

  public register (roles: Role[]) {
    roles.forEach((role: Role) => {
      this.cache.set(role.id, role)
    })
    return this
  }
}