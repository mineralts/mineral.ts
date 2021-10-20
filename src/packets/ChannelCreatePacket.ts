import BasePacket from './BasePacket'
import MineralClient from '../clients/MineralClient'
import Packet from '../decorators/Packet'
import { createChannelFromPayload } from '../../utils/Builders'

@Packet('CHANNEL_CREATE')
export default class ChannelCreatePacket extends BasePacket {
  public async handle (client: MineralClient, payload: any) {
    const guild = client.cacheManager.guilds.cache.get(payload.guild_id)
    const channel = createChannelFromPayload(payload)

    channel.parent = guild?.channels.cache.get(payload.parent_id)
    channel.guild = guild

    guild?.channels.cache.set(channel.id, channel)

    client.emit('channelCreate', channel)
  }
}