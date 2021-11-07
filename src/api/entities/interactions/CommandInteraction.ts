import Interaction from './Interaction'
import {
  CommandParamsResolvable,
  InteractionType,
  MessageComponentResolvable,
  RequestOptions,
  Snowflake
} from '../../../types'
import GuildMember from '../GuildMember'
import TextChannelResolvable from '../channels/TextChannelResolvable'
import Request from '../../../sockets/Request'
import MessageOption from '../../interfaces/MessageOption'
import EmbedRow from '../../components/embeds/EmbedRow'

export default class CommandInteraction extends Interaction {
  constructor (
    id: Snowflake,
    version: number,
    token: string,
    member: GuildMember,
    public channel: TextChannelResolvable,
    public label: string,
    public params: CommandParamsResolvable[],
    public applicationId: Snowflake,
  ) {
    super(id, version, 'APPLICATION_COMMAND', token, undefined, undefined, undefined, member)
  }

  public async pass () {
    const request = new Request(`/interactions/${this.id}/${this.token}/callback`)
    await request.post({
      type: InteractionType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
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