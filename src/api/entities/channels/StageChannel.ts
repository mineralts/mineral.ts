import { NumericChannelInstance, Snowflake } from '../../../types'
import Channel from '../Channel'

export default class StageChannel extends Channel {
  constructor (
    id: Snowflake,
    type: NumericChannelInstance,
    name: string,
  ) {
    super(id, type, name)
  }
}