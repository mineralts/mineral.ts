import Message from './Message'
import GuildMember from '../entities/GuildMember'
import Guild from './Guild'
import InteractionMessageOptions from './InteractionMessageOptions'

export default interface Interaction {
  version: number
  token: string
  message: Message
  member: GuildMember
  guild: Guild
  customId: string
  interactionType: number

  reply (options: InteractionMessageOptions): Promise<void>
  isMessageComponent(): boolean
  isButton (): boolean
  isSelectMenu(): boolean
}