import BasePacket from './BasePacket'
import Client from '../client/Client'
import TextChannel from '../api/entities/channels/TextChannel'
import CommandInteraction from '../api/entities/interactions/CommandInteraction'
import { InteractionTypes } from '../types'
import ButtonInteraction from '../api/entities/interactions/ButtonInteraction'
import MenuInteraction from '../api/entities/interactions/MenuInteraction'

export default class InteractionPacket extends BasePacket {
  public packetType: string = 'INTERACTION_CREATE'

  public async handle (client: Client, payload): Promise<void> {
    let instance: ButtonInteraction | MenuInteraction | CommandInteraction | undefined
    const message = payload.mention_roles
      ? client.messageManager.create(payload.message)
      : null

    if (payload.type === InteractionTypes.MESSAGE_COMPONENT) {
      const Class = payload.data.component_type === 2
        ? await import('../api/entities/interactions/ButtonInteraction')
        : await import('../api/entities/interactions/MenuInteraction')

      instance = new Class.default(
        payload.id,
        payload.version,
        payload.token,
        message || payload.message,
        client.cacheManager.members.get(payload.member.user.id)!,
        client.cacheManager.channels.get(payload.channel_id) as TextChannel,
        client.cacheManager.guilds.get(payload.guild_id)!,
        payload.data.custom_id,
        payload.application_id,
        payload.data,
      )
    }

    if (payload.type === InteractionTypes.APPLICATION_COMMAND) {
      instance = new CommandInteraction(
        payload.id,
        payload.version,
        payload.token,
        client.cacheManager.members.get(payload.member.user.id)!,
        client.cacheManager.channels.get(payload.channel_id) as TextChannel,
        client.cacheManager.guilds.get(payload.guild_id)!,
        payload.data.custom_id,
        payload.application_id,
        payload.data
      )
    }

    client.emit('interactionCreate', instance)
  }
}