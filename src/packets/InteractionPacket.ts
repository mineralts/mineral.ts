import BasePacket from './BasePacket'
import Client from '../client/Client'
import Message from '../api/entities/Message'
import MessageMentions from '../api/entities/MessageMentions'

export default class InteractionPacket extends BasePacket {
  public packetType: string = 'INTERACTION_CREATE'

  public async handle (client: Client, payload): Promise<void> {
    // console.log(payload)

    const message = client.messageManager.create(payload.message)

    const data = {
      version: payload.version,
      token: payload.token,
      message: message,
      member: client.cacheManager.members.get(payload.member.user.id),
      guild: client.cacheManager.guilds.get(payload.guild_id)
    }
    // console.log(data)
    client.emit('interactionCreate', data)
  }
}