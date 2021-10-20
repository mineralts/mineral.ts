import { ChannelType, RequestOptions, Snowflake } from '../../../types'
import Guild from '../Guild'
import CategoryChannel from './CategoryChannel'
import Request from '../../../sockets/Request'

export default class Channel {
  constructor (
    public id: Snowflake,
    public type: keyof typeof ChannelType,
    public name: string,
    public guildId: Snowflake,
    public guild: Guild | undefined,
  ) {
  }

  public isText () {
    return ChannelType[this.type] === ChannelType.GUILD_TEXT
    || ChannelType[this.type] === ChannelType.GUILD_NEWS
  }

  public isVoice () {
    return ChannelType[this.type] === ChannelType.GUILD_VOICE
  }

  public isNews () {
    return ChannelType[this.type] === ChannelType.GUILD_NEWS
  }

  public isCategory () {
    return ChannelType[this.type] === ChannelType.GUILD_CATEGORY
  }

  public async setParent (category: CategoryChannel | Snowflake, option?: RequestOptions) {
    const request = new Request(`/channels/${this.id}`)
    const parentId = typeof category === 'string'
      ? category
      : category.id
    await request.patch({ parent_id: parentId }, option)
  }
}