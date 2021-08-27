import Client from '../client/Client'
import Collection from '@discordjs/collection'
import { Snowflake } from '../types'
import Role from '../api/entities/Role'

export default class RoleManager {
  public roleCollection: Collection<Snowflake, Role> = new Collection()

  constructor (private client: Client) {
  }

  public insertIntoCache (payload: any) {
    payload.forEach((role: any) => {
      this.roleCollection.set(role.id, new Role(
        role.id,
        role.name,
        role.color,
        role.hoist,
        role.position,
        role.permissions,
        role.managed,
        role.mentionable,
      ))
    })

    this.client.cacheManager.roles = this.client.cacheManager.roles.concat(this.roleCollection)
  }
}