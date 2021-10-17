import { ChannelType, Snowflake } from '../../types'

export default class Channel {
  constructor (
    public id: Snowflake,
    public type: keyof typeof ChannelType
  ) {
  }
}