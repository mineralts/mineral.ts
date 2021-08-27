import Collection from '@discordjs/collection'
import { Snowflake } from '../types'
import MessageMentions from '../api/entities/MessageMentions'
import Message from '../api/entities/Message'
import { ChannelResolvable } from '../api/interfaces/ChannelResolvable'
import Client from '../client/Client'
import Member from '../api/entities/Member'

export default class MessageManager {
  constructor (private client: Client) {
  }

  public create (payload) {
    const mentionRoles: Collection<Snowflake, any> = new Collection()
    payload.mention_roles.forEach((id: Snowflake) => {
      const role = this.client.cacheManager.roles.get(id)
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
      const channel = this.client.cacheManager.channels.get(id)
      mentionChannel.set(channel!.id, channel)
    })

    const messageMention = new MessageMentions(
      mentionChannel,
      mentionRoles,
      payload.mentions.map((member: any) => this.client.cacheManager.members.get(member.id)),
      payload.mention_everyone,
    )

    const message: Message = new Message(
      payload.id,
      payload.type,
      payload.content,
      payload.tts,
      messageMention,
      this.client.cacheManager.channels.get(payload.channel_id) as ChannelResolvable,
      payload.referenced_message
        ? this.client.cacheManager.messages.get(payload.referenced_message.id)
        : undefined,
      !!payload.referenced_message,
      this.client.cacheManager.members.get(payload.author.id)!
    )

    this.client.cacheManager.messages.set(message.id, message)
    return message
  }
}