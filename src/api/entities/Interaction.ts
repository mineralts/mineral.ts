import { ComponentType, InteractionComponentType, InteractionTypes, Snowflake } from '../../types'
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
    public member: GuildMember,
    public channel: TextChannel | null,
    public guild: Guild,
    public applicationId: Snowflake,
    public interactionType: InteractionTypes,
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
      channel_id: this.channel?.id,
      data: {
        content: (options.content as string).toString(),
        embeds: options.embeds || [],
        components: options.components || [],
        tts: options.tts || false,
        flags: options.ephemeral ? 1 << 6 : undefined
      }
    })
  }

  public isMessage () {
    return this.interactionType === InteractionTypes.MESSAGE_COMPONENT
  }

  public isCommand () {
    return this.interactionType === InteractionTypes.APPLICATION_COMMAND
  }

  // public isButton (): boolean {
  //   return this.isMessage() && this.componentType === InteractionComponentType.BUTTON
  // }
  //
  // public isSelectMenu (): boolean {
  //   return this.isMessage() && this.componentType === InteractionComponentType.SELECT_MENU
  // }
}