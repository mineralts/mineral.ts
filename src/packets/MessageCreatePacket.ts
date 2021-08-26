import BasePacket from './BasePacket'
import Client from '../client/Client'
import Message from '../api/entities/Message'
import MessageMentions from '../api/entities/MessageMentions'
import Collection from '@discordjs/collection'
import { Snowflake } from '../types'

export default class MessageCreatePacket extends BasePacket {
  public packetType: string = 'MESSAGE_CREATE'

  public async handle (client: Client, payload): Promise<void> {
    // console.log(payload)
    const mentionRoles: Collection<Snowflake, any> = new Collection()
    payload.mention_roles.forEach((id: Snowflake) => {
      const role = client.cacheManager.roles.get(id)
      if (role) {
        mentionRoles.set(role.id, role)
      }
    })

    const mentionChannel: Collection<Snowflake, any> = new Collection()
    const channelMentions = payload.content.split(' ')
      .filter((word: string) => word.startsWith('<#'))
      .map((word: string) => {
       return word
         .replace(/<#/g, '')
         .replace(/>/g, '')
      })

    channelMentions.forEach((id: Snowflake) => {
      const channel = client.cacheManager.channels.get(id)
      mentionChannel.set(channel!.id, channel)
    })

    const messageMention = new MessageMentions(
      mentionChannel,
      mentionRoles,
      new Collection(),
      payload.mention_everyone,
    )
    const message: Message = new Message(
      payload.id,
      payload.type,
      payload.content,
      payload.tts,
      messageMention,
      client.cacheManager.channels.get(payload.channel_id),
      payload.referenced_message
        ? client.cacheManager.messages.get(payload.referenced_message.id)
        : undefined,
      !!payload.referenced_message,
      client.cacheManager.members.get(payload.author.id)!
    )
    client.emit('messageCreate', message)
  }
}