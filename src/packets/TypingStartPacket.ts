import BasePacket from './BasePacket'
import Packet from '../decorators/Packet'
import MineralClient from '../clients/MineralClient'
import TextChannelResolvable from '../api/entities/channels/TextChannelResolvable'

@Packet('TYPING_START')
export default class TypingStartPacket extends BasePacket {
  public async handle (client: MineralClient, payload: any): Promise<void> {
    const guild = client.cacheManager.guilds.cache.get(payload.guild_id)
    const channel = guild?.channels.cache.get<TextChannelResolvable>(payload.channel_id)
    const member = guild?.members.cache.get(payload.user_id)

    client.emit('typingStart', member!, channel!)
  }
}