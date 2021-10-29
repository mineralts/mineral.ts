import Message from '../Message'
import GuildMember from '../GuildMember'
import Interaction from './Interaction'
import SelectMenu from '../../components/selectMenus/SelectMenu'
import MessageOption from '../../interfaces/MessageOption'
import { InteractionType, MessageComponentResolvable, RequestOptions, Snowflake } from '../../../types'
import Request from '../../../sockets/Request'
import EmbedRow from '../../components/embeds/EmbedRow'
import { createMessageInteractionFromPayload } from '../../../utils/Builders'

export default class SelectMenuInteraction extends Interaction {
  constructor (
    id: Snowflake,
    version: number,
    token: string,
    message: Message,
    member: GuildMember,
    public readonly component: SelectMenu,
    public readonly values: (string | number | boolean)[]
  ) {
    super(id, version, 'MESSAGE_COMPONENT', token, component.customId, 'SELECT_MENU', message, member)
  }

  public async getValues () {
    return this.values
  }

  public async reply (messageOption: MessageOption, option?: RequestOptions): Promise<Message | undefined> {
    const request = new Request(`/interactions/${this.id}/${this.token}/callback`)
    const components = messageOption.components?.map((row: EmbedRow) => {
      row.components = row.components.map((component: MessageComponentResolvable) => {
        return component.toJson()
      }) as any[]
      return row
    })

    const payload = await request.post({
      type: InteractionType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        ...messageOption,
        components,
        flags: messageOption.isClientSide ? 1 << 6 : undefined,
      }
    }, option)

    const message = createMessageInteractionFromPayload({
      ...payload,
      guild_id: this.message.channel.guild.id,
    })

    return !messageOption.isClientSide ? message : undefined
  }
}