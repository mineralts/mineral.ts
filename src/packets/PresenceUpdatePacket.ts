import BasePacket from './BasePacket'
import MineralClient from '../clients/MineralClient'
import Packet from '../decorators/Packet'
import { ActivityType, PresenceStatus } from '../types'
import Presence from '../api/entities/Presence'
import Activity from '../api/entities/Activity'
import { DateTime } from 'luxon'
import { keyFromEnum } from '../../utils'

@Packet('PRESENCE_UPDATE')
export default class PresenceUpdatePacket extends BasePacket {
  public async handle (client: MineralClient, payload: any) {
    const guild = client.cacheManager.guilds.cache.get(payload.guild_id)
    const memberPresence = guild?.presences.cache.get(payload.user.id)
    const member = guild?.members.cache.get(payload.user.id)!

    const before = memberPresence
      ? new Presence(
        member,
        memberPresence.status,
        memberPresence.web,
        memberPresence.desktop,
        memberPresence.mobile,
        memberPresence.activities.map((activity: Activity) => (
          new Activity(
            activity.id,
            activity.type,
            activity.description,
            activity.name,
            activity.emoji,
            activity.createdAt
          )
        )))
      : memberPresence

    if (memberPresence) {
      memberPresence.status = keyFromEnum(PresenceStatus, payload.status) as keyof typeof PresenceStatus
      memberPresence.web = keyFromEnum(PresenceStatus, payload.client_status.web) as keyof typeof PresenceStatus || null
      memberPresence.desktop = keyFromEnum(PresenceStatus, payload.client_status.desktop) as keyof typeof PresenceStatus || null
      memberPresence.mobile = keyFromEnum(PresenceStatus, payload.client_status.mobile) as keyof typeof PresenceStatus || null
    } else {
      const presence = new Presence(
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

      guild?.presences.cache.set(presence.member.user.id, presence)
    }

    const after = guild?.presences.cache.get(payload.user.id)
    client.emit('presenceUpdate', before, after!)
  }
}