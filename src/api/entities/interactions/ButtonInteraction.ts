import Message from '../Message'
import GuildMember from '../GuildMember'
import Interaction from './Interaction'
import Button from '../../components/buttons/Button'
import { InteractionType, Snowflake } from '../../../types'
import Request from '../../../sockets/Request'

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
  }

  public async pass () {
    const request = new Request(`/interactions/${this.id}/${this.token}/callback`)
    await request.post({
      type: InteractionType.DEFERRED_UPDATE_MESSAGE,
      data: {
        flags: null,
      },
    })
  }
}