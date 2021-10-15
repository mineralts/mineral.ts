import { DateTime } from 'luxon'
import BasePacket from './BasePacket'
import Packet from '../decorators/Packet'
import MineralClient from '../clients/MineralClient'
import { Message } from '../api/entities/Message'
import TextChannel from '../api/entities/TextChannel'
import { MentionResolvable } from '../api/entities/MentionResolvable'
import { Snowflake } from '../types'
import MessageAttachment from '../api/entities/MessageAttachment'

@Packet('MESSAGE_CREATE')
export class MessagePacket extends BasePacket {
  public async handle(client: MineralClient, payload: any) {
    const guild = client.cacheManager.guilds.cache.get(payload.guild_id)
    const channel = guild?.channels.cache.get(payload.channel_id) as TextChannel
    const author = guild?.members.cache.get(payload.author.id)!

    const message = new Message(
      payload.id,
      payload.type,
      payload.flags,
      payload.tts,
      DateTime.fromISO(payload.timestamp),
      DateTime.fromISO(payload.edited_timestamp),
      channel.messages.cache.get(payload.referenced_message) || null,
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

    if (channel) {
      channel.messages.cache.set(message.id, message)
    }

    client.send('messageCreate', message)
  }
}