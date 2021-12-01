import { Snowflake } from '../../../types'
import Guild from '../Guild'
import MessageManager from '../MessageManager'
import CategoryChannel from './CategoryChannel'
import TextChannelResolvable from './TextChannelResolvable'
import Message from '../Message'

export default class TextChannel extends TextChannelResolvable {
  constructor (
    id: Snowflake,
    name: string,
    description: string | undefined,
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
    isNsfw: boolean,
    parent?: CategoryChannel,
  ) {
    super(id, 'GUILD_TEXT', name, description, guildId, guild, lastMessageId, lastMessage, parentId, permissionOverwrites, position, rateLimitePerUser, topic, messages, isNsfw, parent)
    this.messages = new MessageManager(this)
  }
}