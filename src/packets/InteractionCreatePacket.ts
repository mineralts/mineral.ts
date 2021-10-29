import BasePacket from './BasePacket'
import MineralClient from '../clients/MineralClient'
import Packet from '../decorators/Packet'
import { ComponentType, MessageComponentResolvable } from '../types'
import { createMessageFromPayload } from '../utils/Builders'
import ButtonInteraction from '../api/entities/interactions/ButtonInteraction'
import EmbedRow from '../api/components/embeds/EmbedRow'
import Button from '../api/components/buttons/Button'

@Packet('INTERACTION_CREATE')
export default class InteractionCreatePacket extends BasePacket {
  public async handle (client: MineralClient, payload: any) {
    const message = createMessageFromPayload({
      ...payload.message,
      guild_id: payload.guild_id,
    })

    message.channel.messages.cache.set(message.id, message)

    const member = message.channel.guild.members.cache.get(payload.member.user.id)

    if (payload.data.component_type === ComponentType.BUTTON) {
      const interaction = new ButtonInteraction(
        payload.version,
        payload.token,
        message,
        member!,
        this.getComponentButton(message.components, payload.data.custom_id)[0],
      )

      console.log(`buttonInteraction::${interaction.customId}`)
      client.emit('interactionButtonCreate', interaction)
      client.emit(`buttonInteraction::${interaction.customId}`, interaction)
    }

  }

  public getComponentButton (rows: EmbedRow[], customId: string) {
    return rows.map((row: EmbedRow) => {
      return row.components.find((component: MessageComponentResolvable) => {
        if (component instanceof Button) {
          return component.customId === customId
        }
      })
    }).filter(component => component)
  }
}