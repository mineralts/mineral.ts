import { ChannelTypeResolvable, RequestOptions, Snowflake } from '../../../types'
import Guild from '../Guild'
import CategoryChannel from './CategoryChannel'
import Request from '../../../sockets/Request'

export default class Channel {
  constructor (
    public id: Snowflake,
    public type: keyof typeof ChannelTypeResolvable,
    public name: string,
    public guildId: Snowflake,
    public guild: Guild | undefined,
  ) {
  }

  public isText () {
    return ChannelTypeResolvable[this.type] === ChannelTypeResolvable.GUILD_TEXT
    || ChannelTypeResolvable[this.type] === ChannelTypeResolvable.GUILD_NEWS
  }

  public isVoice () {
    return ChannelTypeResolvable[this.type] === ChannelTypeResolvable.GUILD_VOICE
  }

  public isNews () {
    return ChannelTypeResolvable[this.type] === ChannelTypeResolvable.GUILD_NEWS
  }

  public isCategory () {
    return ChannelTypeResolvable[this.type] === ChannelTypeResolvable.GUILD_CATEGORY
  }

  public async setParent (category: CategoryChannel | Snowflake, option?: RequestOptions) {
    const request = new Request(`/channels/${this.id}`)
    const parentId = typeof category === 'string'
      ? category
      : category.id
    await request.patch({ parent_id: parentId }, option)
  }

  public async setName (value: string, option?: RequestOptions) {
    const request = new Request(`/channels/${this.id}`)
    await request.patch({ name: value }, option)
  }
}