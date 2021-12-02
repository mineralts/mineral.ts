import { DateTime } from 'luxon'
import { Snowflake } from '../../types'

export default class ThreadMember {
  constructor (
    public id: Snowflake,
    public userId: Snowflake,
    public joinTimestamp: DateTime,
    public flags: number,
  ) {
  }
}