import { MessageType, Snowflake } from '../../types'
import TextChannel from './channels/TextChannel'
import Member from '../entities/Member'

export default interface Message {
  id: Snowflake
  type: MessageType
  content: string
  isTTS: boolean
  mentions: any
  channel: TextChannel,
  replied: Message | undefined
  isReplied: boolean
  author: Member

  delete (options?: { timeout: number }): Promise<void>
  edit (value: string, options?: { timeout: number }): Promise<void>
  pin (): Promise<void>
}