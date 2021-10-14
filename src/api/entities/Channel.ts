import { Snowflake } from '../../types'

export default class Channel {
  constructor (
    public id: Snowflake,
    public type: any
  ) {
  }
}