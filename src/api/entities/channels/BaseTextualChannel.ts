import Channel from './Channel'
import { ChannelType, MessageCollectorOption, RequestOptions, Snowflake } from '../../../types'
import { MessageCollector } from '../../components/MessageCollector'
import MessageOption from '../../interfaces/MessageOption'
import Message from '../Message'
import Request from '../../../sockets/Request'
import EmbedRow from '../../components/embeds/EmbedRow'
import Button from '../../components/buttons/Button'
import ButtonLink from '../../components/buttons/ButtonLink'
import { createMessageFromPayload } from '../../../utils/Builders'
import Guild from '../Guild'
import { MessageManager } from '../MessageManager'
import CategoryChannel from './CategoryChannel'

export default class BaseTextualChannel extends Channel {
  constructor (
    id: Snowflake,
    type: keyof typeof ChannelType,
    public name: string,
    public guildId: Snowflake,
    public guild: Guild,
    public lastMessageId: Snowflake,
    public parentId: Snowflake,
    public permissionOverwrites: { [K: string]: string }[],
    public position: number,
    public rateLimitePerUser: number,
    public topic: string,
    public messages: MessageManager,
    public parent?: CategoryChannel,
  ) {
    super(id, type, name, guildId, guild)
  }

  public createMessageCollector (options?: MessageCollectorOption) {
    return new MessageCollector(this, options)
  }

  public async send (messageOption: MessageOption, option?: RequestOptions): Promise<Message> {
    const request = new Request(`/channels/${this.id}/messages`)
    const components = messageOption.components?.map((row: EmbedRow) => {
      row.components = row.components.map((component: Button | ButtonLink) => component.toJson())
      return row
    })

    const payload = await request.post({
      ...messageOption,
      components
    }, option)

    return createMessageFromPayload({
      ...payload,
      guild_id: this.guild.id,
    })
  }
}