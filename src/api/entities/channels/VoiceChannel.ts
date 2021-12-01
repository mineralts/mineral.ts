import Channel from './Channel'
import { RTC_REGION, Snowflake } from '../../../types'
import CategoryChannel from './CategoryChannel'
import Guild from '../Guild'
import Request from '../../../sockets/Request'
import Logger from '@leadcodedev/logger'

export default class VoiceChannel extends Channel {
  constructor (
    id: Snowflake,
    name: string,
    guildId: Snowflake,
    guild: Guild | undefined,
    public userLimit: number,
    public region: null,
    public rateLimitPerUser: number,
    position: number,
    public permission: any[],
    parentId: Snowflake,
    public bitrate: number,
    parent?: CategoryChannel,
  ) {
    super(id, 'GUILD_VOICE', name, guildId, guild, parentId, position, parent)
  }

  public async setBitrate (value: number) {
    const request = new Request(`/channels/${this.id}`)
    if (value >= 8000 && value <= 96000) {
      await request.patch({ bitrate: value })
      this.bitrate = value
    } else {
      Logger.send('error', 'Please define your bitrate between 8000 and 96000')
    }
  }

  public async setRtcRegion (region: keyof typeof RTC_REGION) {
    const request = new Request(`/channels/${this.id}`)
    await request.patch({ rtc_region: region !== 'AUTO' ? RTC_REGION[region] : null })
  }
}