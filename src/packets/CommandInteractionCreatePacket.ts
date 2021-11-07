import BasePacket from './BasePacket'
import MineralClient from '../clients/MineralClient'
import Packet from '../decorators/Packet'
import { InteractionType, MessageComponentResolvable } from '../types'
import EmbedRow from '../api/components/embeds/EmbedRow'
import Button from '../api/components/buttons/Button'
import SelectMenu from '../api/components/selectMenus/SelectMenu'
import CommandInteraction from '../api/entities/interactions/CommandInteraction'
import TextChannelResolvable from '../api/entities/channels/TextChannelResolvable'

@Packet('INTERACTION_CREATE')
export default class CommandInteractionCreatePacket extends BasePacket {
  public async handle (client: MineralClient, payload: any) {
    if (payload.type !== InteractionType.APPLICATION_COMMAND) {
      return
    }

    const guild = client.cacheManager.guilds.cache.get(payload.guild_id)
    const channel = guild?.channels.cache.get(payload.channel_id)
    const member = guild?.members.cache.get(payload.member.user.id)
    console.log(payload)

    const commandInteraction = new CommandInteraction(
      payload.id,
      payload.version,
      payload.token,
      member!,
      channel as TextChannelResolvable,
      payload.data.name,
      payload.data.options || [],
      payload.application_id,
    )

    client.emit('interactionCommandCreate', commandInteraction)

    if (payload.data.name === commandInteraction.label) {
      client.emit(`interactionCommand::${commandInteraction.label}`, commandInteraction)
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