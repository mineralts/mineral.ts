import BasePacket from './BasePacket'
import Packet from '../decorators/Packet'
import MineralClient from '../clients/MineralClient'
import TextChannel from '../api/entities/channels/TextChannel'
import { createMessageFromPayload } from '../utils/Builders'

@Packet('MESSAGE_CREATE')
export class MessagePacket extends BasePacket {
  public async handle(client: MineralClient, payload: any) {
    const guild = client.cacheManager.guilds.cache.get(payload.guild_id)
    const channel = guild?.channels.cache.get(payload.channel_id) as TextChannel

    const message = createMessageFromPayload(payload)

    if (channel) {
      channel.lastMessageId = message.id
      channel.lastMessage = message
      channel.messages.cache.set(message.id, message)
    }

    client.emit('messageCreate', message)
  }
}