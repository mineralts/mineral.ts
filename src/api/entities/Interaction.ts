import Message from '../interfaces/Message'
import { InteractionComponentType, InteractionTypes, Snowflake } from '../../types'
import GuildMember from './GuildMember'
import Guild from '../interfaces/Guild'
import InteractionMessageOptions from '../interfaces/InteractionMessageOptions'
import Request from '../../rest/Request'
import TextChannel from './channels/TextChannel'

export default class Interaction {
  constructor (
    public id: Snowflake,
    public version: number,
    public token: string,
    public message: Message,
    public member: GuildMember,
    public channel: TextChannel,
    public guild: Guild,
    public customId: string,
    public applicationId: Snowflake,
    public interactionType: InteractionTypes,
    public componentType: InteractionComponentType
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
      channel_id: this.channel.id,
      data: {
        content: (options.content as string).toString(),
        embeds: options.embeds || [],
        components: options.components || [],
        tts: options.tts || false,
        flags: options.ephemeral ? 1 << 6 : undefined
      }
    })
  }

  public isMessageComponent () {
    return this.interactionType === InteractionTypes.MESSAGE_COMPONENT
  }

  public isButton (): boolean {
    return this.isMessageComponent() && this.componentType === InteractionComponentType.BUTTON
  }

  public isSelectMenu (): boolean {
    return this.isMessageComponent() && this.componentType === InteractionComponentType.SELECT_MENU
  }
}