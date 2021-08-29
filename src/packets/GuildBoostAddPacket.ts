import Client from '../client/Client'
import BasePacket from './BasePacket'
import GuildBoost from '../api/entities/GuildBoost'
import Collection from '@discordjs/collection'
import { MessageType } from '../types'

export default class GuildBoostAddPacket extends BasePacket {
  public packetType: string = 'MESSAGE_CREATE'

  public async handle (client: Client, payload: any): Promise<void> {
    if (payload.type === MessageType.USER_PREMIUM_GUILD_SUBSCRIPTION) {
      const guild = client.cacheManager.guilds.get(payload.guild_id)
      const member = guild?.members.get(payload.user.id)

      client.emit('guildBoostAdd', new GuildBoost(member!))
    }
  }
}