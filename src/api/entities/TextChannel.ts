import Channel from './Channel'
import { ChannelType, Snowflake } from '../../types'
import Guild from './Guild'

export default class TextChannel extends Channel {
  constructor (
    id: Snowflake,
    public name: string,
    public guildId: Snowflake,
    public guild: Guild,
    public lastMessageId: Snowflake,
    public parentId: Snowflake,
    public permissionOverwrites: { [K: string]: string }[],
    public position: number,
    public rateLimitePerUser: number,
    public topic: string,
  ) {
    super(id, ChannelType.GUILD_TEXT)
  }
}