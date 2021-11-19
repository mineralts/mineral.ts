import { Snowflake } from '../../types'
import User from './User'
import Guild from './Guild'
import Channel from './Channel'

export default class VoiceState {
  constructor (
    public id: Snowflake,
    public type: number,
    public guild_id: Snowflake | undefined,
    public channel_id: Snowflake,
    public user: User | undefined,
    public name: string,
    public avatar: string,
    public token: string | undefined,
    public application_id: Snowflake,
    public source_guild: Guild | undefined,
    public source_channel: Channel | undefined,
    public url: string | undefined,
  ) {
  }
}