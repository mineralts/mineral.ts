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

export default class Message {
  public reactions: MessageReactionManager = new MessageReactionManager(this)

  constructor (
    public id: Snowflake,
    public type: number,
    public flags: string[],
    public isTTS: boolean,
    public createdAt: DateTime | null,
    public updatedAt: DateTime | null,
    public referencedMessage: Message | null | undefined,
    public isPinned: boolean,
    public mentions: MentionResolvable,
    public author: GuildMember | undefined,
    public guild: Guild | undefined,
    public channel: TextChannel,
    public content: string,
    public attachment: MessageAttachment,
    public components: any[],
    public embeds: any[],
  ) {
  }

  public async crossPost (option?: RequestOptions) {
    if (this.channel?.type === 'GUILD_NEWS') {
      const request = new Request(`/channels/${this.channel?.id}/messages/${this.id}/crosspost`)
      console.log(await request.post(null, option))
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

  public async react (emoji: string | Emoji, option?: RequestOptions) {
    let encodedEmoji = emoji instanceof Emoji
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