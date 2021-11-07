import Message from '../Message'
import GuildMember from '../GuildMember'
import Interaction from './Interaction'
import Button from '../../components/buttons/Button'
import { InteractionType, MessageComponentResolvable, RequestOptions, Snowflake } from '../../../types'
import Request from '../../../sockets/Request'
import MessageOption from '../../interfaces/MessageOption'
import EmbedRow from '../../components/embeds/EmbedRow'

export default class ButtonInteraction extends Interaction {
  constructor (
    id: Snowflake,
    version: number,
    token: string,
    message: Message,
    member: GuildMember,
    public component: Button | undefined,
  ) {
    super(id, version, 'MESSAGE_COMPONENT', token, component?.customId, 'BUTTON', message, member)
  }

  public async pass () {
    const request = new Request(`/interactions/${this.id}/${this.token}/callback`)
    await request.post({
      type: InteractionType.DEFERRED_UPDATE_MESSAGE,
      data: {
        flags: null,
      },
    })
  }

  public async reply (messageOption: MessageOption, option?: RequestOptions): Promise<void> {
    const request = new Request(`/interactions/${this.id}/${this.token}/callback`)
    const components = messageOption.components?.map((row: EmbedRow) => {
      row.components = row.components.map((component: MessageComponentResolvable) => {
        return component.toJson()
      }) as any[]
      return row
    })

    await request.post({
      type: InteractionType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        ...messageOption,
        components,
        flags: messageOption.isClientSide ? 1 << 6 : undefined,
      }
    }, option)
  }
}