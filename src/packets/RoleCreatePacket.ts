import Packet from '../decorators/Packet'
import MineralClient from '../clients/MineralClient'
import BasePacket from './BasePacket'
import Role from '../api/entities/Role'

@Packet('GUILD_ROLE_CREATE')
export default class RoleCreatePacket extends BasePacket {
  public async handle (client: MineralClient, payload: any) {
    const guild = client.cacheManager.guilds.cache.get(payload.guild_id)

    const role = new Role(
      payload.role.id,
      payload.role.name,
      payload.role.unicode_emoji,
      payload.role.position,
      payload.role.permissions,
      payload.role.mentionable,
      payload.role.managed,
      payload.role.icon,
      payload.role.hoist,
      payload.role.color,
    )

    guild?.roles.cache.set(role.id, role)

    client.emit('roleCreate', role)
  }
}
