import { Snowflake } from '../../types'
import User from './User'
import Guild from './Guild'
import Channel from './Channel'

export default class VoiceState {
  constructor (
    public id: Snowflake,
    public type: number,
    public guild_id: Snowflake | undefined,
    public channel_id: Snowflake | undefined,
    public user: User,
    public name: string | undefined,
    public avatar: string | undefined,
    public token: string,
    public application_id: Snowflake | undefined,
    public source_guild: Guild,
    public source_channel: Channel,
    public url: string,
  ) {
  }
}