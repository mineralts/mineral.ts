import BasePacket from './BasePacket'
import Client from '../client/Client'
import Interaction from '../api/entities/Interaction'

export default class InteractionPacket extends BasePacket {
  public packetType: string = 'INTERACTION_CREATE'

  public async handle (client: Client, payload): Promise<void> {
    const message = client.messageManager.create(payload.message)

    console.log(payload)

    client.emit('interactionCreate', new Interaction(
      payload.id,
      payload.version,
      payload.token,
      message as any,
      client.cacheManager.members.get(payload.member.user.id)!,
      client.cacheManager.guilds.get(payload.guild_id)!,
      payload.data.custom_id,
      payload.application_id,
      payload.type,
      payload.data.component_type,
    ))
  }
}