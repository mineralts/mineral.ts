import Channel from './Channel'
import {
  ChannelTypeResolvable,
  MessageComponentResolvable, Milliseconds,
  RequestOptions,
  Snowflake
} from '../../../types'
import MessageOption from '../../interfaces/MessageOption'
import Message from '../Message'
import Request from '../../../sockets/Request'
import EmbedRow from '../../components/embeds/EmbedRow'
import { createMessageFromPayload } from '../../../utils/Builders'
import Guild from '../Guild'
import MessageManager from '../MessageManager'
import CategoryChannel from './CategoryChannel'
import Logger from '@leadcodedev/logger'
import InvalidBody from '../../../reporters/errors/InvalidBody'
import { DateTime } from 'luxon'

export default class TextChannelResolvable extends Channel {
  constructor (
    id: Snowflake,
    type: keyof typeof ChannelTypeResolvable,
    name: string,
    public description: string | undefined,
    guildId: Snowflake,
    guild: Guild,
    public lastMessageId: Snowflake,
    public lastMessage: Message | undefined,
    parentId: Snowflake,
    public permissionOverwrites: { [K: string]: string }[],
    position: number,
    public cooldown: DateTime | undefined,
    public messages: MessageManager,
    public isNsfw: boolean,
    parent?: CategoryChannel,
  ) {
    super(id, type, name, guildId, guild, parentId, position, parent)
  }

  public async setCooldown (value: Milliseconds, option?: RequestOptions) {
    if (value < 0 || value > 21600) {
      Logger.send('error', `${value} cannot be value < 0 or value > 21600`)
    }

    const request = new Request(`/channels/${this.id}`)
    await request.patch({ rate_limit_per_user: value }, option)
    this.cooldown = DateTime.fromMillis(value)
  }

  public async setDescription (value: string, option?: RequestOptions) {
    const request = new Request(`/channels/${this.id}`)
    await request.patch({ topic: value }, option)
    this.description = value
  }

  public async setNSFW(bool: boolean) {
    const request = new Request(`/channels/${this.id}`)
    await request.patch({ nsfw: bool })
    this.isNsfw = bool
  }

  public async send (messageOption: MessageOption, option?: RequestOptions): Promise<Message> {
    const request = new Request(`/channels/${this.id}/messages`)
    const components = messageOption.components?.map((row: EmbedRow) => {
      row.components = row.components.map((component: MessageComponentResolvable) => {
        return component.toJson() as unknown as MessageComponentResolvable
      })
      return row
    })

    if (!messageOption.content?.length && !messageOption.embeds?.length) {
      new InvalidBody()
    }

    const payload = await request.post({
      ...messageOption,
      components
    }, option)

    return createMessageFromPayload({
      ...payload,
      guild_id: this.guild!.id,
    })
  }
}
