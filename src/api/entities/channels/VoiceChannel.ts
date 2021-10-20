import Channel from './Channel'
import { Snowflake } from '../../../types'
import { CategoryChannel } from './CategoryChannel'
import Guild from '../Guild'

export default class VoiceChannel extends Channel {
  constructor (
    id: Snowflake,
    name: string,
    guildId: Snowflake,
    guild: Guild | undefined,
    public userLimit: number,
    public region: null,
    public rateLimitPerUser: number,
    public position: number,
    public permission: any[],
    public parentId: Snowflake,
    public bitrate: number,
    public parent?: CategoryChannel,
  ) {
    super(id, 'GUILD_VOICE', name, guildId, guild)
  }
}