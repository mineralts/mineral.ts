import BasePacket from './BasePacket'
import Client from '../client/Client'
import Interaction from '../api/entities/Interaction'
import TextChannel from '../api/entities/channels/TextChannel'

export default class InteractionPacket extends BasePacket {
  public packetType: string = 'INTERACTION_CREATE'

  public async handle (client: Client, payload): Promise<void> {
    const message = payload.mention_roles
      ? client.messageManager.create(payload.message)
      : null

    client.emit('interactionCreate', new Interaction(
      payload.id,
      payload.version,
      payload.token,
      message as any,
      client.cacheManager.members.get(payload.member.user.id)!,
      client.cacheManager.channels.get(payload.channel_id) as TextChannel,
      client.cacheManager.guilds.get(payload.guild_id)!,
      payload.data.custom_id,
      payload.application_id,
      payload.type,
      payload.data.component_type,
    ))
  }
}