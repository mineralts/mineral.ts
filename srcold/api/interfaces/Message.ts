import { MessageType, Snowflake } from '../../types'
import TextChannel from './channels/TextChannel'
import GuildMember from '../entities/GuildMember'

export default interface Message {
  id: Snowflake
  type: MessageType
  content: unknown
  isTTS: boolean
  mentions: any
  channel: TextChannel,
  replied: Message | undefined
  isReplied: boolean
  author: GuildMember

  delete (options?: { timeout: number }): Promise<void>
  edit (value: string, options?: { timeout: number }): Promise<void>
  pin (): Promise<void>
}