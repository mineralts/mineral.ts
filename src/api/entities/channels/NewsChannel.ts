import { NumericChannelInstance, Snowflake } from '../../../types'
import Channel from '../Channel'

export default class NewsChannel extends Channel {
  constructor (
    id: Snowflake,
    type: NumericChannelInstance,
    name: string,
    public guildId: Snowflake,
  ) {
    super(id, type, name)
  }
}