import BasePacket from './BasePacket'
import MineralClient from '../clients/MineralClient'
import Packet from '../decorators/Packet'

@Packet('GUILD_ROLE_DELETE')
export default class RoleDeletePacket extends BasePacket {
  public async  handle (client: MineralClient, payload: any)  {
    const guild = client.cacheManager.guilds.cache.get(payload.guild_id)
    const role = guild?.roles.cache.get(payload.role_id)

    if (!role) {
      return
    }

    client.emit('roleDelete', role)

    guild?.roles.cache.delete(role.id)
  }

}
