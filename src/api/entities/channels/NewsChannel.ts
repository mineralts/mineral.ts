import { Snowflake } from '../../../types'
import Guild from '../Guild'
import { MessageManager } from '../MessageManager'
import BaseTextualChannel from './BaseTextualChannel'
import { CategoryChannel } from './CategoryChannel'

export default class NewsChannel extends BaseTextualChannel {
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
    parent?: CategoryChannel
  ) {
    super(id, 'GUILD_NEWS', name, guildId, guild, lastMessageId, parentId, permissionOverwrites, position, rateLimitePerUser, topic, messages, parent)
  }
}