import { Snowflake } from '../../../types'
import Guild from '../Guild'
import MessageManager from '../MessageManager'
import CategoryChannel from './CategoryChannel'
import TextChannelResolvable from './TextChannelResolvable'
import Message from '../Message'
import { DateTime } from 'luxon'

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
    cooldown: DateTime,
    messages: MessageManager,
    isNsfw: boolean,
    parent?: CategoryChannel,
  ) {
    super(id, 'GUILD_TEXT', name, description, guildId, guild, lastMessageId, lastMessage, parentId, permissionOverwrites, position, cooldown, messages, isNsfw, parent)
    this.messages = new MessageManager(this)
  }
}