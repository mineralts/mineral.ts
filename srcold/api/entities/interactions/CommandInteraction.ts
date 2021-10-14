import Interaction from '../Interaction'
import GuildMember from '../GuildMember'
import Guild from '../../interfaces/Guild'
import { InteractionComponentType, InteractionTypes, Snowflake } from '../../../types'
import TextChannel from '../channels/TextChannel'

export default class CommandInteraction extends Interaction {
  constructor (
    public id: Snowflake,
    version: number,
    token: string,
    member: GuildMember,
    channel: TextChannel,
    guild: Guild,
    public customId: string,
    applicationId: Snowflake,
    componentType: InteractionComponentType = InteractionComponentType.BUTTON,
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
      InteractionTypes.APPLICATION_COMMAND,
    )
  }
}