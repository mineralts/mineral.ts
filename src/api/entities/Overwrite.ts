import { Snowflake, OverwriteType } from '../../types'

export default class Overwrite {
  constructor (
    public id: Snowflake,
    public type: OverwriteType,
    public allow: string,
    public deny: string,
  ) {
  }
}