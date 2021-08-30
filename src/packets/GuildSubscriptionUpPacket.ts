import Client from '../client/Client'
import BasePacket from './BasePacket'
import GuildBoost from '../api/entities/GuildBoost'
import Collection from '@discordjs/collection'
import { MessageType } from '../types'

export default class GuildSubscriptionUpPacket extends BasePacket {
  public packetType: string = 'GUILD_UPDATE'

  public async handle (client: Client, payload: any): Promise<void> {
    console.log(true)
    client.emit('guildSubscriptionUp', true)
  }
}