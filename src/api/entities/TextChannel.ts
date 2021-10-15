import Channel from './Channel'
import { ChannelType, Snowflake } from '../../types'
import Guild from './Guild'
import { MessageManager } from './MessageManager'

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
    public messages: MessageManager
  ) {
    super(id, ChannelType.GUILD_TEXT)
  }
}