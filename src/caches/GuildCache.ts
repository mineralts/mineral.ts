import Collection from '@discordjs/collection'
import { Snowflake } from '../types'
import Guild from '../api/entities/Guild'
import CacheManager from './CacheManager'

export default class GuildCache {
  public cache: Collection<Snowflake, Guild> = new Collection()

  constructor (private cacheManager: CacheManager) {
  }

  public compute (guild: Guild) {
    const cachedGuid = this.cache.get(guild.id)
    if (!cachedGuid) {
      this.cache.set(guild.id, guild)
    }
  }
}