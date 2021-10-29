import { MessageComponentResolvable } from '../../../types'
import Message from '../Message'
import GuildMember from '../GuildMember'
import Interaction from './Interaction'
import Button from '../../components/buttons/Button'

export default class ButtonInteraction extends Interaction {
  constructor (
    version: number,
    token: string,
    message: Message,
    member: GuildMember,
    public component: MessageComponentResolvable | undefined,
  ) {
    super(version, 'MESSAGE_COMPONENT', token, (component as Button).customId, 'BUTTON', message, member)
  }
}