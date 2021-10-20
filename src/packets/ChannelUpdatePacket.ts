import BasePacket from './BasePacket'
import MineralClient from '../clients/MineralClient'
import Packet from '../decorators/Packet'
import { createChannelFromPayload } from '../utils/Builders'

@Packet('CHANNEL_UPDATE')
export default class ChannelUpdatePacket extends BasePacket {
  public async handle (client: MineralClient, payload: any) {
    const guild = client.cacheManager.guilds.cache.get(payload.guild_id)
    const before = guild?.channels.cache.get(payload.id)
    const after = createChannelFromPayload(payload)

    after.parent = guild?.channels.cache.get(payload.parent_id)
    after.guild = guild

    client.emit('channelUpdate', before!, after)
    guild?.channels.cache.set(after.id, after)
  }
}