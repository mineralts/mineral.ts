import BasePacket from './BasePacket'
import MineralClient from '../clients/MineralClient'
import Packet from '../decorators/Packet'
import { createChannelFromPayload } from '../utils/Builders'
import MessageManager from '../api/entities/MessageManager'

@Packet('CHANNEL_CREATE')
export default class ChannelCreatePacket extends BasePacket {
  public async handle (client: MineralClient, payload: any) {
    const guild = client.cacheManager.guilds.cache.get(payload.guild_id)
    const channel = createChannelFromPayload(payload)

    guild?.channels.cache.set(channel.id, channel)

    channel.parent = guild?.channels.cache.get(payload.parent_id)
    channel.messages = new MessageManager(channel)
    channel.guild = guild

    client.emit('channelCreate', channel)
  }
}