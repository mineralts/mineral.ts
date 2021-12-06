import Channel from './Channel'
import { Snowflake } from '../../../types'
import Guild from '../Guild'

export default class CategoryChannel extends Channel {
  constructor (
    id: Snowflake,
    position: number,
    name: string,
    guildId: Snowflake,
    guild: Guild | undefined,
  ) {
    super(id, 'GUILD_CATEGORY', name, guildId, guild, undefined, position)
  }
}
