import Channel from './Channel'
import { Snowflake } from '../../../types'
import Guild from '../Guild'

export class CategoryChannel extends Channel {
  constructor (
    id: Snowflake,
    name: string,
    guildId: Snowflake,
    guild: Guild | undefined,
  ) {
    super(id, 'GUILD_CATEGORY', name, guildId, guild)
  }
}