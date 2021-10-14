import Collection from '@discordjs/collection'
import { ChannelResolvable, Snowflake } from '../../types'

export default class GuildChannelManager {
  public cache: Collection<Snowflake, ChannelResolvable> = new Collection()

  public register (channels: ChannelResolvable[]) {
    channels.filter(a => a).forEach((channel: ChannelResolvable) => {
      this.cache.set(channel.id, channel)
    })
    return this
  }
}