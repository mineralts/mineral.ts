import Message from '../src/api/entities/Message'
import { DateTime } from 'luxon'
import { MentionResolvable } from '../src/api/entities/MentionResolvable'
import { Snowflake } from '../src/types'
import MessageAttachment from '../src/api/entities/MessageAttachment'
import TextChannel from '../src/api/entities/TextChannel'
import Context from '../src/Context'

export function createMessageFromPayload (payload) {
  const client = Context.getClient()
  const guild = client.cacheManager.guilds.cache.get(payload.guild_id)
  const channel = guild?.channels.cache.get(payload.channel_id) as TextChannel
  const author = guild?.members.cache.get(payload.author.id)!

  return new Message(
    payload.id,
    payload.type,
    payload.flags,
    payload.tts,
    payload.timestamp
      ? DateTime.fromISO(payload.timestamp)
      : null,
    payload.edited_timestamp
      ? DateTime.fromISO(payload.edited_timestamp)
      :null,
    payload.referenced_message
      ? channel.messages.cache.get(payload.referenced_message)
      : null,
    payload.pinned,
    new MentionResolvable(
      payload.mention_everyone,
      payload.mention_roles.map((roleId: Snowflake) => guild?.roles.cache.get(roleId)),
      payload.mentions,
    ),
    author,
    guild,
    channel,
    payload.content,
    new MessageAttachment(),
    payload.components,
    payload.embed,
  )
}