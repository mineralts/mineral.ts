import Interaction from './Interaction'
import { CommandParamsResolvable, Snowflake } from '../../../types'
import GuildMember from '../GuildMember'
import TextChannelResolvable from '../channels/TextChannelResolvable'

export default class CommandInteraction extends Interaction {
  constructor (
    id: Snowflake,
    version: number,
    token: string,
    member: GuildMember,
    public channel: TextChannelResolvable,
    public label: string,
    public params: CommandParamsResolvable[]
  ) {
    super(id, version, 'APPLICATION_COMMAND', token, undefined, undefined, undefined, member)
  }
}