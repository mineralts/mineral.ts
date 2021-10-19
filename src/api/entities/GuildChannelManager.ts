import Collection from '@discordjs/collection'
import { ChannelResolvable, Snowflake } from '../../types'

export default class GuildChannelManager {
  public cache: Collection<Snowflake, ChannelResolvable> = new Collection()

  public register (channels: Collection<Snowflake, ChannelResolvable>) {
    this.cache = channels
    return this
  }
}