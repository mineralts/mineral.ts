import { NumericChannelInstance, Snowflake } from '../../../types'
import Channel from '../Channel'

export default class NewsChannel extends Channel {
  constructor (
    id: Snowflake,
    type: NumericChannelInstance,
    name: string,
  ) {
    super(id, type, name)
  }
}