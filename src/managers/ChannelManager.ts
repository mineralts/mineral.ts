import Collection from '@discordjs/collection'
import { NumericChannelInstance, Snowflake } from '../types'
import Channel from '../api/entities/Channel'
import Client from '../client/Client'
import TextChannel from '../api/entities/channels/TextChannel'
import CategoryChannel from '../api/entities/channels/CategoryChannel'
import NewsChannel from '../api/entities/channels/NewsChannel'
import VoiceChannel from '../api/entities/channels/VoiceChannel'
import StageChannel from '../api/entities/channels/StageChannel'

export default class ChannelManager {
  public channelCollection: Collection<Snowflake, Channel> = new Collection()

  constructor (private client: Client) {
  }

  public insertIntoCache (channels: any[]) {
    channels.map((channel: Channel) => {
      const instance = this.channelInstance(channel.type as NumericChannelInstance, channel) as unknown as Channel
      this.channelCollection.set(channel.id, instance)
    })

    this.client.cacheManager.channels = this.client.cacheManager.channels.concat(this.channelCollection)
  }

  protected channelInstance (type: NumericChannelInstance, payload: any): TextChannel | CategoryChannel | NewsChannel | undefined {
    if (type === 0) return new TextChannel(
      payload.id,
      payload.type,
      payload.name,
      payload.topic,
      payload.rate_limit_per_user,
      payload.position,
      payload.permission_overwrites,
      payload.parentId,
      payload.last_message_id,
    )

    if (type === 2) return new VoiceChannel(
      payload.id,
      payload.type,
      payload.name,
      payload.position,
      payload.permission_overwrites,
      payload.parent_id,
      payload.rtc_region,
      payload.bitrate,
    )

    if (type === 4) return new CategoryChannel(
      payload.id,
      payload.type,
      payload.name,
      payload.position,
      payload.permission_overwrites
    )

    if (type === 5) return new NewsChannel(
      payload.id,
      payload.type,
      payload.name,
    )

    if (type === 13) return new StageChannel(
      payload.id,
      payload.type,
      payload.name,
    )
  }
}