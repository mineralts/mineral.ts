import BasePacket from './BasePacket'
import Packet from '../decorators/Packet'
import MineralClient from '../clients/MineralClient'
import { createGuildMember } from '../utils/Builders'

@Packet('GUILD_MEMBER_ADD')
export default class MemberJoinPacket extends BasePacket {
  public async handle (client: MineralClient, payload: any) {
    const guild = client.cacheManager.guilds.cache.get(payload.guild_id)
    const member = createGuildMember(guild, payload)

    guild?.members.cache.set(member.id, member)

    client.emit('guildMemberJoin', member)
  }
}