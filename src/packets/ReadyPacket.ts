import BasePacket from './BasePacket'
import Client from '../client/Client'
import User from '../api/entities/User'
import { Ready } from '../types/Packet'
import Application from '../api/entities/Application'
import axios from 'axios'
import Global from '../utils/Global'

export default class ReadyPacket implements BasePacket {
  public packetType: string = 'READY'

  public async handle (client: Client, payload: Ready): Promise<void> {
    Global.getSharedItem().set('botId', payload.user.id)
    const user: User = new User(
      payload.user.id,
      payload.user.username,
      payload.user.avatar,
      null,
      payload.user.email,
      payload.user.flags,
      payload.user.verified,
      payload.user.discriminator,
      payload.user.mfa_enabled,
      payload.user.premium_since,
      payload.user.bot,
    )

    const application: Application = new Application(
      payload?.application.id,
      payload.application.flags,
      payload.v,
    )

    client.emit('ready', {
      user,
      guilds: payload.guilds.map((guild) => guild.id),
      application,
    })
  }
}