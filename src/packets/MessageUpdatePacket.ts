import BasePacket from './BasePacket'
import Packet from '../decorators/Packet'
import MineralClient from '../clients/MineralClient'
import TextChannel from '../api/entities/TextChannel'
import { createMessageFromPayload } from '../../utils/Builders'

@Packet('MESSAGE_UPDATE')
export default class MessageUpdatePacket extends BasePacket {
  public async handle (client: MineralClient, payload: any) {
    const guild = client.cacheManager.guilds.cache.get(payload.guild_id)
    const channel = guild?.channels.cache.get(payload.channel_id) as TextChannel
    const message = channel.messages.cache.get(payload.id)

    const after = createMessageFromPayload(payload)
    client.emit('messageUpdate', message || undefined, after)

    channel.messages.cache.set(after.id, after)
  }
}