import Message from '../Message'
import GuildMember from '../GuildMember'
import Interaction from './Interaction'
import SelectMenu from '../../components/selectMenus/SelectMenu'

export default class SelectMenuInteraction extends Interaction{
  constructor (
    version: number,
    token: string,
    message: Message,
    member: GuildMember,
    public component: SelectMenu,
  ) {
    super(version, 'MESSAGE_COMPONENT', token, component.customId, 'SELECT_MENU', message, member)
  }
}