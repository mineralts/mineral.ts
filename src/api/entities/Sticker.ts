import { Snowflake } from '../../types'
import User from './User'

export default class StageInstance {
  constructor (
    public id: Snowflake,
    public pack_id: Snowflake,
    public name: string,
    public description: string | undefined,
    public tags: string,
    public asset: string,
    public type: number,
    public format_type: number,
    public isAvailable: boolean,
    public guild_id: Snowflake,
    public user: User,
    public sort_value: number,
  ) {
  }
}