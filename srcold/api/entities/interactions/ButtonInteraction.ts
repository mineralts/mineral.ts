import Interaction from '../Interaction'
import Message from '../../interfaces/Message'
import GuildMember from '../GuildMember'
import Guild from '../../interfaces/Guild'
import { InteractionComponentType, InteractionTypes, Snowflake } from '../../../types'
import TextChannel from '../channels/TextChannel'

export default class ButtonInteraction extends Interaction {
  public componentType: InteractionComponentType = InteractionComponentType.BUTTON

  constructor (
    public id: Snowflake,
    version: number,
    token: string,
    message: Message,
    member: GuildMember,
    channel: TextChannel,
    guild: Guild,
    public customId: string,
    applicationId: Snowflake,
    public data: any,
  ) {
    super(
      id,
      version,
      token,
      member,
      channel,
      guild,
      applicationId,
      InteractionTypes.MESSAGE_COMPONENT,
    )
  }
}