import Packet from '../decorators/Packet'
import BasePacket from './BasePacket';
import MineralClient from '../clients/MineralClient';

@Packet('INVITE_DELETE')
export class InviteDeletePacket extends BasePacket {
  public async handle (client: MineralClient, payload: any) {
    const guild = client.cacheManager.guilds.cache.get(payload.guild_id)
    const invite = guild!.invites.cache.get(payload.code)!

    if(!invite) {
      return
    }

    client.emit('inviteDelete', invite)

    guild?.invites.cache.delete(invite.code)
  }

}
