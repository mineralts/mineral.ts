import Packet from '../decorators/Packet'
import BasePacket from './BasePacket'
import MineralClient from '../clients/MineralClient'
import ClientUser from '../api/entities/ClientUser'
import User from '../api/entities/User'

@Packet('READY')
export default class ReadyPacket extends BasePacket {
  public async handle (client: MineralClient, payload: any) {
    const user = new User(
      payload.user.id,
      payload.user.username,
      payload.user.discriminator,
      `${payload.user.username}#${payload.user.discriminator}`,
      payload.user.bot,
      payload.user.verified,
      payload.user.mfa_enabled,
      payload.user.flags,
      payload.user.email,
      payload.user.avatar,
      payload.user.banner,
    )

    const clientUser = new ClientUser(
      user,
      payload.session_id,
      payload.presences,
      [],
      payload.application
    )

    client.clientUser = clientUser

    client.emit('ready', clientUser)
  }
}