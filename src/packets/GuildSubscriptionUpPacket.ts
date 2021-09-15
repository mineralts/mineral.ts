import Client from '../client/Client'
import BasePacket from './BasePacket'

export default class GuildSubscriptionUpPacket extends BasePacket {
  public packetType: string = 'GUILD_UPDATE'

  public async handle (client: Client, payload: any): Promise<void> {
    console.log(true)
    client.emit('guildSubscriptionUp', true)
  }
}