import Message from './Message'
import Member from '../entities/Member'
import Guild from './Guild'
import InteractionMessageOptions from './InteractionMessageOptions'

export default interface Interaction {
  version: number
  token: string
  message: Message
  member: Member
  guild: Guild
  customId: string
  interactionType: number

  reply (options: InteractionMessageOptions): Promise<void>
}