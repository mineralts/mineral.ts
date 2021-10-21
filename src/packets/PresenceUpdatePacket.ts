import BasePacket from './BasePacket'
import MineralClient from '../clients/MineralClient'
import Packet from '../decorators/Packet'
import { ActivityType, PresenceStatus } from '../types'
import Presence from '../api/entities/Presence'
import Activity from '../api/entities/Activity'
import { DateTime } from 'luxon'
import { keyFromEnum } from '../utils'

@Packet('PRESENCE_UPDATE')
export default class PresenceUpdatePacket extends BasePacket {
  public async handle (client: MineralClient, payload: any) {
    const guild = client.cacheManager.guilds.cache.get(payload.guild_id)
    const member = guild?.members.cache.get(payload.user.id)!

    if (member.user.presence?.status !== keyFromEnum(PresenceStatus, payload.status)) {
      let presence: Presence = new Presence(
        member,
        keyFromEnum(PresenceStatus, payload.status) as keyof typeof PresenceStatus,
        keyFromEnum(PresenceStatus, payload.client_status.web) as keyof typeof PresenceStatus || null,
        keyFromEnum(PresenceStatus, payload.client_status.desktop) as keyof typeof PresenceStatus || null,
        keyFromEnum(PresenceStatus, payload.client_status.mobile) as keyof typeof PresenceStatus || null,
        payload.activities.map((activity: any) => (
          new Activity(
            activity.id,
            ActivityType[activity.type as number] as any,
            activity.state,
            activity.name,
            null,
            DateTime.fromISO(activity.created_at)
          )
        ))
      )

      client.emit('presenceUpdate', member.user.presence, presence)
      member.user.presence = presence
    }
  }
}