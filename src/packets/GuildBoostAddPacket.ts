import Client from '../client/Client'
import BasePacket from './BasePacket'
import { MessageType } from '../types'

export default class GuildBoostAddPacket extends BasePacket {
  public packetType: string = 'MESSAGE_CREATE'

  public async handle (client: Client, payload: any): Promise<void> {
    if (payload.type === MessageType.USER_PREMIUM_GUILD_SUBSCRIPTION) {
      const guild = client.cacheManager.guilds.get(payload.guild_id)
      const member = guild?.members.get(payload.user.id)

      /**
       * @Todo Fix _patch
       */
      // member?.user._patch({ premiumSince: payload.premium_since })
      client.emit('guildBoostAdd', member)
    }
  }
}