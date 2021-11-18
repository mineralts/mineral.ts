import BasePacket from './BasePacket'
import Packet from '../decorators/Packet'
import MineralClient from '../clients/MineralClient'
import { createGuildMember } from '../utils/Builders'
import Invite from '../api/entities/Invite'
import Request from '../sockets/Request'

@Packet('GUILD_MEMBER_ADD')
export default class MemberJoinPacket extends BasePacket {
  public async handle (client: MineralClient, payload: any) {
    const guild = client.cacheManager.guilds.cache.get(payload.guild_id)
    const member = createGuildMember(guild, payload)

    member.guild = guild!
    guild?.members.cache.set(member.id, member)

    const request = new Request(`/guilds/${guild!.id}/invites`)
    const invites = await request.get()

    const invite = invites.map((item) => {
      return guild?.invites.find((invite: Invite) => invite.count < item.uses)
    }) as Invite[]

    invite[0].count++

    client.emit('guildMemberJoin', member, invite[0])

  }
}