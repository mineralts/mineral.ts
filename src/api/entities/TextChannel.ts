import Channel from './Channel'
import { MessageCollectorOption, Snowflake } from '../../types'
import Guild from './Guild'
import { MessageManager } from './MessageManager'
import { MessageCollector } from '../components/MessageCollector'
import Request from '../../sockets/Request'
import { createMessageFromPayload } from '../../../utils/Builders'
import Message from './Message'
import MessageOption from '../interfaces/MessageOption'
import Embed from '../../../srcold/api/interfaces/Embed'
import EmbedRow from '../components/embeds/EmbedRow'
import Button from '../components/buttons/Button'
import ButtonLink from '../components/buttons/ButtonLink'

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

  public async send (messageOption: MessageOption): Promise<Message> {
    console.log(messageOption.components)
    const request = new Request(`/channels/${this.id}/messages`)
    const payload = await request.post({
      ...messageOption,
      components: messageOption.components?.map((row: EmbedRow) => {
        row.components = row.components.map((component: Button | ButtonLink) => component.toJson())
        return row
      })
    })

    const newMessage = createMessageFromPayload({
      ...payload,
      guild_id: this.guild.id,
    })
    this.messages.cache.set(newMessage.id, newMessage)
    return newMessage
  }
}