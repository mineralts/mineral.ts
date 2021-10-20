import BasePacket from './BasePacket'
import MineralClient from '../clients/MineralClient'
import Packet from '../decorators/Packet'

@Packet('CHANNEL_DELETE')
export default class ChannelDeletePacket extends BasePacket {
  public async handle (client: MineralClient, payload: any) {
    const guild = client.cacheManager.guilds.cache.get(payload.guild_id)
    const channel = guild?.channels.cache.get(payload.id)

    client.emit('channelCreate', channel!)

    guild?.channels.cache.delete(channel!.id)
  }
}