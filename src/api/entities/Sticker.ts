import { Snowflake } from '../../types'
import User from './User'

export default class StageInstance {
  constructor (
    public id: Snowflake,
    public pack_id: Snowflake | undefined,
    public name: string,
    public description: string,
    public tags: string,
    public asset: string,
    public type: number,
    public format_type: number,
    public isAvailable: boolean | undefined,
    public guild_id: Snowflake | undefined,
    public user: User | undefined,
    public sort_value: number | undefined,
  ) {
  }
}