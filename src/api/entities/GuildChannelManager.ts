import Collection from '@discordjs/collection'
import {
  ChannelOptionResolvable,
  ChannelResolvable,
  ChannelTypeResolvable,
  Snowflake,
} from '../../types'
import Request from '../../sockets/Request'
import Guild from './Guild'

export default class GuildChannelManager {
  public cache: Collection<Snowflake, ChannelResolvable> = new Collection()

  constructor (private guild?: Guild) {
  }

  public register (channels: Collection<Snowflake, ChannelResolvable>) {
    this.cache = channels
    return this
  }

  public async create (channel: ChannelOptionResolvable) {
    let payload: any
    const request = new Request(`/guilds/${this.guild?.id}/channels`)
    console.log(channel.options?.parent || channel.options?.parentId)
    const baseChannel = {
      name: channel.name,
      type: ChannelTypeResolvable[channel.type],
      permission_overwrites: channel.permissionOverwrites || [],
      parent_id: channel.options?.parent || channel.options?.parentId
    }

    if (channel.type === 'GUILD_TEXT') {
      payload = await request.post({
        ...baseChannel,
        nsfw: channel.options?.nsfw || false,
        rate_limit_per_user: channel.options?.cooldown || 0,
        topic: channel.options?.topic || ''
      })
    }

    if (channel.type === 'GUILD_VOICE') {
      payload = await request.post({
        ...baseChannel,
        user_limit: channel.options?.userLimit || 0,
        bitrate: channel.options?.bitrate || 64000,
      })
    }

    if (channel.type === 'GUILD_CATEGORY') {
      payload = await request.post({
        ...baseChannel,
      })
    }

    return this.cache.get(payload.id)
  }
}