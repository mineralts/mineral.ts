import Interaction from './Interaction'
import {
  ChannelResolvable,
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

  public getChannel (name: string): ChannelResolvable | undefined {
    const channel = this.params.find((param: CommandParamsResolvable) => param.name == name) as unknown as { value: Snowflake }
    return this.channel.guild.channels.cache.get(channel?.value)
  }

  public getMember (name: string): GuildMember | undefined {
    const channel = this.params.find((param: CommandParamsResolvable) => param.name == name) as unknown as { value: Snowflake }
    return this.channel.guild.members.cache.get(channel?.value)
  }

  public getString (name: string): string | undefined {
    const stringValue = this.params.find((param: CommandParamsResolvable) => param.name == name) as unknown as { value: string }
    return stringValue.value
  }

  public getNumber (name: string): number | undefined {
    const stringValue = this.params.find((param: CommandParamsResolvable) => param.name == name) as unknown as { value: number }
    return stringValue.value
  }

  public getChoices<T> (name: string): T | undefined {
    const choice = this.params.find((param: CommandParamsResolvable) => param.name == name) as unknown as { value: T }
    return choice.value
  }
}