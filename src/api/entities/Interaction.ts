import Message from '../interfaces/Message'
import { Snowflake } from '../../types'
import Member from './Member'
import Guild from '../interfaces/Guild'
import InteractionMessageOptions from '../interfaces/InteractionMessageOptions'
import Request from '../../rest/Request'

export default class Interaction {
  constructor (
    public id: Snowflake,
    public version: number,
    public token: string,
    public message: Message,
    public member: Member,
    public guild: Guild,
    public customId: string,
    public applicationId: Snowflake,
    public interactionType: number,
  ) {
  }

  public async reply (options: InteractionMessageOptions) {
    const request = new Request(`/interactions/${this.id}/${this.token}/callback`)

    await request.post({
      version: 1,
      token: this.token,
      application_id: this.applicationId,
      type: 4,
      guild_id: this.guild.id,
      channel_id: this.message.channel.id,
      data: {
        content: options.content,
        embeds: options.embeds || [],
        components: options.components || [],
        tts: options.tts || false,
        flags: options.ephemeral ? 1 << 6 : undefined
      }
    })
  }
}