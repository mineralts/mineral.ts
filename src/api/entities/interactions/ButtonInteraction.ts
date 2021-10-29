import Message from '../Message'
import GuildMember from '../GuildMember'
import Interaction from './Interaction'
import Button from '../../components/buttons/Button'
import { Snowflake } from '../../../types'

export default class ButtonInteraction extends Interaction {
  constructor (
    id: Snowflake,
    version: number,
    token: string,
    message: Message,
    member: GuildMember,
    public component: Button | undefined,
  ) {
    super(id, version, 'MESSAGE_COMPONENT', token, component?.customId, 'BUTTON', message, member)
    console.log(this.component)
  }
}