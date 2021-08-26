import Channel from '../Channel'
import { NumericChannelInstance, Snowflake } from '../../../types'

export default class ThreadChannel extends Channel {
  constructor (
    id: Snowflake,
    type: NumericChannelInstance,
    name: string,
    public metadata: any,
    public rateLimitPerUser: number,
    public ownerId: Snowflake,
    public messageCount: number,
    public memberCount: number,
    public lastMessageId: number,
    public guild: Snowflake,
  ) {
    super(id, type, name)
  }
}