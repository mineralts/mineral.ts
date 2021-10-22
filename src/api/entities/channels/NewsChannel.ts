import { Snowflake } from '../../../types'
import Guild from '../Guild'
import MessageManager from '../MessageManager'
import TextChannelResolvable from './TextChannelResolvable'
import CategoryChannel from './CategoryChannel'
import Message from '../Message'

export default class NewsChannel extends TextChannelResolvable {
  constructor (
    id: Snowflake,
    name: string,
    guildId: Snowflake,
    guild: Guild,
    lastMessageId: Snowflake,
    lastMessage: Message | undefined,
    parentId: Snowflake,
    permissionOverwrites: { [K: string]: string }[],
    position: number,
    rateLimitePerUser: number,
    topic: string,
    messages: MessageManager,
    parent?: CategoryChannel
  ) {
    super(id, 'GUILD_NEWS', name, guildId, guild, lastMessageId, lastMessage, parentId, permissionOverwrites, position, rateLimitePerUser, topic, messages, parent)
  }
}