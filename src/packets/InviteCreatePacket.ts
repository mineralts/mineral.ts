import Packet from '../decorators/Packet'
import BasePacket from './BasePacket'
import MineralClient from '../clients/MineralClient'
import Invite from '../api/entities/Invite'
import {DateTime} from 'luxon'

@Packet('INVITE_CREATE')
export default class InviteCreatePacket extends BasePacket {
  public async handle (client: MineralClient, payload: any) {
    const guild = client.cacheManager.guilds.cache.get(payload.guild_id)
    const member = guild?.members.cache.get(payload.inviter.id)
    const channel = guild?.channels.cache.get(payload.channel_id)

    const invite = new Invite(
      member!,
      channel!,
      payload.code,
      payload.uses,
      payload.max_uses,
      payload.temporary,
      DateTime.fromISO(payload.expires_at),
      DateTime.fromISO(payload.created_at)
    )

    guild?.invites.set(invite.code, invite)

    client.emit('inviteCreate', invite)
  }
}
