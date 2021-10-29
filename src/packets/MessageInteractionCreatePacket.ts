import BasePacket from './BasePacket'
import MineralClient from '../clients/MineralClient'
import Packet from '../decorators/Packet'
import { ComponentType, InteractionType, MessageComponentResolvable } from '../types'
import { createMessageInteractionFromPayload } from '../utils/Builders'
import ButtonInteraction from '../api/entities/interactions/ButtonInteraction'
import EmbedRow from '../api/components/embeds/EmbedRow'
import Button from '../api/components/buttons/Button'
import SelectMenu from '../api/components/selectMenus/SelectMenu'
import SelectMenuInteraction from '../api/entities/interactions/SelectMenuInteraction'

@Packet('INTERACTION_CREATE')
export default class MessageInteractionCreatePacket extends BasePacket {
  public async handle (client: MineralClient, payload: any) {
    if (payload.type !== InteractionType.MESSAGE_COMPONENT) {
      return
    }

    const message = createMessageInteractionFromPayload({
      ...payload,
      guild_id: payload.guild_id,
    })

    message.channel.messages.cache.set(message.id, message)
    const member = message.channel.guild.members.cache.get(payload.member.user.id)

    if (payload.data.component_type === ComponentType.BUTTON) {
      const interaction = new ButtonInteraction(
        payload.id,
        payload.version,
        payload.token,
        message,
        member!,
        this.getComponentButton(message.components, payload.data.custom_id),
      )

      client.emit('interactionButtonCreate', interaction)
      client.emit(`interactionButton::${interaction.customId}`, interaction)
    }

    if (payload.data.component_type === ComponentType.SELECT_MENU) {
      const interaction = new SelectMenuInteraction(
        payload.id,
        payload.version,
        payload.token,
        message,
        member!,
        this.getComponentSelectMenu(message.components, payload.data.custom_id),
        payload.data.values,
      )

      client.emit('interactionSelectMenuCreate', interaction)
      client.emit(`interactionSelectMenu::${interaction.customId}`, interaction)
    }

  }

  public getComponentButton (rows: EmbedRow[], customId: string): Button {
    const component = rows.map((row: EmbedRow) => (
      row.components.find((component: MessageComponentResolvable) => {
        if (!(component instanceof Button)) {
          return
        }

        if (component.customId === customId) return component
        else return undefined
      })
    )).filter(component => component)

    console.log((component as unknown as Button)[0])

    return (component as unknown as Button)[0]
  }

  public getComponentSelectMenu (rows: EmbedRow[], customId: string): SelectMenu {
    const component = rows.map((row: EmbedRow) => (
      row.components.find((component: MessageComponentResolvable) => {
        return component instanceof SelectMenu
          ? component.customId === customId && component
          : undefined
      })
    )).filter(component => component)

    return (component as unknown as SelectMenu)[0]
  }
}