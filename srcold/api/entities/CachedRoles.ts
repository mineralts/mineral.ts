import Collection from '@discordjs/collection'
import { Snowflake } from '../../types'

export default class CachedRoles {
  public cache: Collection<Snowflake, any> = new Collection()

  constructor (roles: Collection<Snowflake, any>) {
    this.cache = this.cache.concat(roles)
  }
}