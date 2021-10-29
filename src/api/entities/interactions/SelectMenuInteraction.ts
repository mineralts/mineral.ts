import Message from '../Message'
import GuildMember from '../GuildMember'
import Interaction from './Interaction'

export default class SelectMenuInteraction extends Interaction{
  constructor (
    version: number,
    token: string,
    customId: string,
    message: Message,
    member: GuildMember
  ) {
    super(version, 'MESSAGE_COMPONENT', token, customId, 'SELECT_MENU', message, member)
  }
}