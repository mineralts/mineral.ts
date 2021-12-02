import { DateTime } from 'luxon'
import { MentionResolvable } from './MentionResolvable'
import GuildMember from './GuildMember'
import Guild from './Guild'
import TextChannel from './channels/TextChannel'
import { RequestOptions, Snowflake } from '../../types'
import MessageAttachment from './MessageAttachment'
import Request from '../../sockets/Request'
import { createMessageFromPayload } from '../../utils/Builders'
import MessageOption from '../interfaces/MessageOption'
import Emoji from './Emoji'
import MessageReactionManager from './MessageReactionManager'
import Context from '../../Context'
import { parseEmoji } from '../../utils'
import MessageEmbed from '../components/embeds/MessageEmbed'

export default class Message {
  public reactions: MessageReactionManager = new MessageReactionManager(this)

  constructor (
    public id: Snowflake,
    public type: number,
    public readonly flags: string[],
    public readonly isTTS: boolean,
    public readonly createdAt: DateTime | null,
    public readonly updatedAt: DateTime | null,
    public readonly referencedMessage: Message | null | undefined,
    public isPinned: boolean,
    public readonly mentions: MentionResolvable,
    public readonly author: GuildMember | undefined,
    public readonly guild: Guild | undefined,
    public readonly channel: TextChannel,
    public readonly content: string,
    public readonly attachment: MessageAttachment,
    public readonly components: any[],
    public readonly embeds: MessageEmbed[],
  ) {
  }

  public async crossPost (option?: RequestOptions) {
    if (this.channel?.type === 'GUILD_NEWS') {
      const request = new Request(`/channels/${this.channel?.id}/messages/${this.id}/crosspost`)
      console.log(await request.post(null, option))
    }
  }

  public async pin (option?: RequestOptions) {
    if (!this.isPinned) {
      const request = new Request(`/channels/${this.channel?.id}/pins/${this.id}`)
      await request.update({}, option)
    }
  }

  public async unPin (option?: RequestOptions) {
    if (!this.isPinned) {
      const request = new Request(`/channels/${this.channel?.id}/pins/${this.id}`)
      await request.delete(option)
    }
  }

  public async delete (options?: RequestOptions) {
    const request = new Request(`/channels/${this.channel?.id}/messages/${this.id}`)
    await request.delete(options)
  }

  public async edit (message: MessageOption) {
    const request = new Request(`/channels/${this.channel?.id}/messages/${this.id}`)
    await request.patch({
      content: message.content,
      embeds: message.embeds,
      attachment: message.attachment,
      components: message.components,
    })
  }

  public async reload () {
    await this.edit(this)
  }

  public async react (emoji: string | Emoji, option?: RequestOptions) {
    const encodedEmoji = emoji instanceof Emoji
      ? encodeURI(`${emoji.label}:${emoji.id}`)
      : encodeURI(emoji)

    const request = new Request(`/channels/${this.channel?.id}/messages/${this.id}/reactions/${encodedEmoji}/@me`)
    await request.update(null, option)
    const client = Context.getClient()

    let a: Emoji = emoji as Emoji
    if (typeof emoji === 'string') {
      const parsedEmoji = parseEmoji(emoji)
      a = new Emoji(parsedEmoji!.id!, parsedEmoji!.name, false, true, false, [])
    }

    this.reactions.addReaction(a, client.clientUser!)
  }

  public async fetch () {
    const request = new Request(`/channels/${this.channel?.id}/messages/${this.id}`)
    const payload = await request.get()

    if (payload) {
      const message = createMessageFromPayload(payload)
      this.channel?.messages.cache.set(this.id, message)
    }
  }
}