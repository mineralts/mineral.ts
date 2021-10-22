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
import MessageManager from '../MessageManager'
import CategoryChannel from './CategoryChannel'
import Logger from '@leadcodedev/logger'

export default class TextChannelResolvable extends Channel {
  constructor (
    id: Snowflake,
    type: keyof typeof ChannelType,
    public name: string,
    public guildId: Snowflake,
    public guild: Guild,
    public lastMessageId: Snowflake,
    public lastMessage: Message | undefined,
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

  public async setCooldown (value: number, option?: RequestOptions) {
    if (value < 0 || value > 21600) {
      Logger.send('error', `${value} cannot be value < 0 or value > 21600`)
    }

    const request = new Request(`/channels/${this.id}`)
    await request.patch({ rate_limit_per_user: value }, option)
  }

  public async setDescription (value: string, option?: RequestOptions) {
    const request = new Request(`/channels/${this.id}`)
    await request.patch({ topic: value }, option)
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