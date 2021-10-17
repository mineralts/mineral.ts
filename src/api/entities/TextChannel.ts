import Channel from './Channel'
import { MessageCollectorOption, Snowflake } from '../../types'
import Guild from './Guild'
import { MessageManager } from './MessageManager'
import { MessageCollector } from '../components/MessageCollector'

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
    super(id, 'GUILD_TEXT')
  }

  public createMessageCollector (options?: MessageCollectorOption) {
    return new MessageCollector(this, options)
  }
}