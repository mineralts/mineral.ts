import Client from '../client/Client'
import BasePacket from './BasePacket'
import { MessageType } from '../types'

export default class GuildBoostAddPacket extends BasePacket {
  public packetType: string = 'GUILD_MEMBER_UPDATE'

  public async handle (client: Client, payload: any): Promise<void> {
    const guild = client.cacheManager.guilds.get(payload.guild_id)
    const member = guild?.members.get(payload.user.id)

    if (!payload.premium_since) {
      return
    }

    if (new Date(member!.user.premiumSince) < new Date(payload.premium_since)) {
      member?.user._patch({ premiumSince: payload.premium_since })
      client.emit('guildMemberBoostAdd', member)
    }
  }
}