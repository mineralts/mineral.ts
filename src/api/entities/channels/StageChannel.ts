import { RTC_REGION, Snowflake } from '../../../types'
import Guild from '../Guild'
import CategoryChannel from './CategoryChannel'
import Channel from './Channel'

export default class StageChannel extends Channel {
  constructor (
    id: Snowflake,
    name: string,
    topic: string | null,
    guildId: Snowflake,
    guild: Guild | undefined,
    public maxUser: number,
    public region: keyof typeof RTC_REGION,
    public rateLimitPerUser: number,
    position: number,
    public permission: any[],
    parentId: Snowflake | undefined,
    public bitrate: number,
    parent?: CategoryChannel
  ) {
    super(id, 'GUILD_STAGE_VOICE', name, guildId, guild!, parentId, position, parent)
  }
}
