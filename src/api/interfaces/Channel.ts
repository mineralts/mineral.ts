import { NumericChannelInstance, Snowflake } from '../../types'

export default interface Channel {
  id: Snowflake
  type: NumericChannelInstance
  name: string
}