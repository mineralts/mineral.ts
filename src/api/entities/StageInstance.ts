import { Snowflake } from '../../types'

export default class StageInstance {
  constructor (
    public id: Snowflake,
    public guild_id: Snowflake,
    public channel_id: Snowflake,
    public topic: string,
    public privacy_level: number,
    public isDiscoverable_disabled: boolean,
  ) {
  }
}