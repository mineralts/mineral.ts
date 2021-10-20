import { Snowflake } from '../../../types'
import Guild from '../Guild'
import { MessageManager } from '../MessageManager'
import { CategoryChannel } from './CategoryChannel'
import BaseTextualChannel from './BaseTextualChannel'

export default class TextChannel extends BaseTextualChannel {
  constructor (
    id: Snowflake,
    name: string,
    guildId: Snowflake,
    guild: Guild,
    lastMessageId: Snowflake,
    parentId: Snowflake,
    permissionOverwrites: { [K: string]: string }[],
    position: number,
    rateLimitePerUser: number,
    topic: string,
    messages: MessageManager,
    parent?: CategoryChannel,
  ) {
    super(id, 'GUILD_TEXT', name, guildId, guild, lastMessageId, parentId, permissionOverwrites, position, rateLimitePerUser, topic, messages, parent)
    this.messages = new MessageManager(this)
  }
}