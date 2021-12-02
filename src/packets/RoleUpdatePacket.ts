import Packet from '../decorators/Packet'
import BasePacket from './BasePacket'
import MineralClient from '../clients/MineralClient'
import {createRoleFromPayload} from '../utils/Builders';

@Packet('GUILD_ROLE_UPDATE')
export default class RoleUpdatePacket extends BasePacket {
  public async handle (client: MineralClient, payload: any) {
    const guild = client.cacheManager.guilds.cache.get(payload.guild_id!)
    const role = guild.roles.cache.get(payload.role.id)

    const after = createRoleFromPayload(payload)
    client.emit('roleUpdate', role!, after)

    guild?.roles.cache.set(after.id, after)
  }
}
