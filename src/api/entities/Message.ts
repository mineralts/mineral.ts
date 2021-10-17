import { DateTime } from 'luxon'
import { MentionResolvable } from './MentionResolvable'
import GuildMember from './GuildMember'
import Guild from './Guild'
import TextChannel from './TextChannel'
import { RequestOptions, Snowflake, MessageOption } from '../../types'
import MessageAttachment from './MessageAttachment'
import Request from '../../sockets/Request'

export default class Message {
  constructor (
    public id: Snowflake,
    public type: number,
    public flags: string[],
    public isTTS: boolean,
    public createdAt: DateTime | null,
    public updatedAt: DateTime | null,
    public referencedMessage: Message | null,
    public isPinned: boolean,
    public mentions: MentionResolvable,
    public author: GuildMember,
    public guild: Guild | undefined,
    public channel: TextChannel | undefined,
    public content: string,
    public attachment: MessageAttachment,
    public components: any[],
    public embeds: any[]
  ) {
  }

  public async crossPost (option?: RequestOptions) {
    if (this.channel?.type === 'GUILD_NEWS') {
      console.log(`/channels/${this.channel?.id}/${this.id}/crosspost`)
      const request = new Request(`/channels/${this.channel?.id}/messages/${this.id}/crosspost`)
      console.log(await request.post())
    }
  }

  public async delete (options?: RequestOptions) {
    const request = new Request(`/channels/${this.channel?.id}/messages/${this.id}`)
    const result = await request.delete()

    if (result) {
      this.channel?.messages.cache.delete(this.id)
    }
  }

  public async edit (message: MessageOption) {
    const request = new Request(`/channels/${this.channel?.id}/messages/${this.id}`)
    const payload = await request.patch({
      content: message.content,
      embeds: message.embeds,
      attachment: message.attachment,
      components: message.components,
    })

    if (payload) {
      this.content = payload.content
      this.embeds = payload.embeds
      this.attachment = payload.attachment
      this.components = payload.components
      this.updatedAt = payload.edited_timestamp
        ? DateTime.fromISO(payload.edited_timestamp)
        : null
    }
  }
}