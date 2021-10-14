import Channel from '../Channel'
import { Snowflake } from '../../../types'
import Message from '../Message'
import MessageOption from '../MessageOption'

export default interface TextChannel extends Channel {
  topic: string
  rateLimitPerUser: number
  position: number
  permissionOverwrites: any[]
  parentId: Snowflake | null
  lastMessageId: Snowflake | null

  send (message: MessageOption): Promise<Message>
}