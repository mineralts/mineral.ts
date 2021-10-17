import Channel from './Channel'
import { MessageCollectorOption, MessageOption, Snowflake } from '../../types'
import Guild from './Guild'
import { MessageManager } from './MessageManager'
import { MessageCollector } from '../components/MessageCollector'
import Request from '../../sockets/Request'
import { createMessageFromPayload } from '../../../utils/Builders'
import Message from './Message'

export default class TextChannel extends Channel {
  constructor (
    id: Snowflake,
    public name: string,
    public guildId: Snowflake,
    public guild: Guild,
    public lastMessageId: Snowflake,
    public parentId: Snowflake,
    public permissionOverwrites: { [K: string]: string }[],
    public position: number,
    public rateLimitePerUser: number,
    public topic: string,
    public messages: MessageManager
  ) {
    super(id, 'GUILD_TEXT')
  }

  public createMessageCollector (options?: MessageCollectorOption) {
    return new MessageCollector(this, options)
  }

  public async send (message: any): Promise<Message> {
    const request = new Request(`/channels/${this.id}/messages`)
    const payload = await request.post(message)

    const newMessage = createMessageFromPayload({
      ...payload,
      guild_id: this.guild.id,
    })
    this.messages.cache.set(message.id, newMessage)
    return newMessage
  }
}