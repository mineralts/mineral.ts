import BasePacket from './BasePacket'
import Packet from '../decorators/Packet'
import MineralClient from '../clients/MineralClient'

@Packet('GUILD_MEMBER_UPDATE')
export default class RulesAcceptPacket extends BasePacket {
  public async handle (client: MineralClient, payload: any) {
    const guild = client.cacheManager.guilds.cache.get(payload.guild_id)
    const member = guild?.members.cache.get(payload.user.id)

    if (!member) {
      return
    }

    if (member.isPending !== payload.pending) {
      member.isPending = false
      client.emit('rulesAccept', member)
    }
  }
}