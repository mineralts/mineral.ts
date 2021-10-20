import BasePacket from './BasePacket'
import MineralClient from '../clients/MineralClient'
import Packet from '../decorators/Packet'
import TextChannel from '../api/entities/TextChannel'

@Packet('MESSAGE_DELETE')
export default class MessageDeletePacket extends BasePacket {
  public async handle (client: MineralClient, payload: any) {
    const guild = client.cacheManager.guilds.cache.get(payload.guild_id)
    const channel = guild?.channels.cache.get(payload.channel_id) as TextChannel
    const message = channel.messages.cache.get(payload.id)

    client.emit('messageDelete', message!)
    channel.messages.cache.delete(payload.id)
  }
}