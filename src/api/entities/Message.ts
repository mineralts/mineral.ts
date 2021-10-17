import { DateTime } from 'luxon'
import { MentionResolvable } from './MentionResolvable'
import GuildMember from './GuildMember'
import Guild from './Guild'
import TextChannel from './TextChannel'
import { Snowflake } from '../../types'
import MessageAttachment from './MessageAttachment'
import Request from '../../sockets/Request'

export class Message {
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

  public async crossPost () {
    if (this.channel?.type === 'GUILD_NEWS') {
      console.log(`/channels/${this.channel?.id}/${this.id}/crosspost`)
      const request = new Request(`/channels/${this.channel?.id}/messages/${this.id}/crosspost`)
      console.log(await request.post())
    }
  }
}