import { Snowflake } from '../../types'
import User from './User'

export default class StageInstance {
  constructor (
    public id: Snowflake,
    public packId: Snowflake,
    public name: string,
    public description: string | undefined,
    public tags: string,
    public asset: string,
    public type: number,
    public formatType: number,
    public isAvailable: boolean,
    public guildId: Snowflake,
    public user: User,
    public sortValue: number,
  ) {
  }
}