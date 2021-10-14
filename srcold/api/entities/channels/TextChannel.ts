import Channel from '../Channel'
import { NumericChannelInstance, Snowflake } from '../../../types'
import Request from '../../../rest/Request'
import MessageOption from '../../interfaces/MessageOption'

export default class TextChannel extends Channel {
  constructor (
    id: Snowflake,
    type: NumericChannelInstance,
    name: string,
    public guildId: Snowflake,
    public topic: string = '',
    public rateLimitPerUser: number,
    public position: number,
    public permissionOverwrites: any[] = [],
    public parentId: Snowflake | null = null,
    public lastMessageId: Snowflake | null
  ) {
    super(id, type, name)
  }

  public async send (messageOption: MessageOption) {
    const request = new Request(`/channels/${this.id}/messages`)
    await request.post({
      content: messageOption.content,
      embeds: messageOption.embeds,
      components: messageOption.components,
      tts: messageOption.tts
    })
  }
}