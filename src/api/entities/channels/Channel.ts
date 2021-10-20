import { ChannelType, Snowflake } from '../../../types'

export default class Channel {
  constructor (
    public id: Snowflake,
    public type: keyof typeof ChannelType,
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
}