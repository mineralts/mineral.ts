import BasePacket from './BasePacket'
import MineralClient from '../clients/MineralClient'
import Packet from '../decorators/Packet'
import { ActivityType, PresenceStatus } from '../types'
import Presence from '../api/entities/Presence'
import Activity from '../api/entities/Activity'
import { DateTime } from 'luxon'
import { keyFromEnum } from '../utils'
import Emoji from '../api/entities/Emoji'

@Packet('PRESENCE_UPDATE')
export default class PresenceUpdatePacket extends BasePacket {
  public async handle (client: MineralClient, payload: any) {
    const guild = client.cacheManager.guilds.cache.get(payload.guild_id)
    const member = guild?.members.cache.get(payload.user.id)!

    const presence = new Presence(
      member,
      keyFromEnum(PresenceStatus, payload.status) as keyof typeof PresenceStatus,
      keyFromEnum(PresenceStatus, payload.client_status.web) as keyof typeof PresenceStatus || null,
      keyFromEnum(PresenceStatus, payload.client_status.desktop) as keyof typeof PresenceStatus || null,
      keyFromEnum(PresenceStatus, payload.client_status.mobile) as keyof typeof PresenceStatus || null,
      []
    )

    presence.activities = payload.activities.map((activity: any) => {
      const emoji = activity.emoji
        ? new Emoji(
          activity.emoji.id,
          activity.emoji.name,
          false,
          false,
          activity.emoji.animated,
        )
        : null

      const timestamps = {
        start: activity.timestamps?.start
          ? DateTime.fromMillis(activity.timestamps.start)
          : undefined,
        end: activity.timestamps?.end
          ? DateTime.fromMillis(activity.timestamps.end)
          : undefined
      }

      return new Activity(
        activity.id,
        ActivityType[activity.type as number] as any,
        activity.state,
        activity.name,
        emoji,
        timestamps,
        activity.state,
        activity.detail,
        {
          smallText: activity.assets?.small_text,
          smallImage: activity.assets?.small_image,
          largeText: activity.assets?.large_text,
          largeImage: activity.assets?.large_image,
        },
        activity.buttons,
        activity.sync_id,
        activity.session_id,
        DateTime.fromMillis(activity.created_at),
        activity.application_id,
      )
    })

    client.emit('presenceUpdate', member.user.presence, presence)
    member.user.presence = presence
  }
}