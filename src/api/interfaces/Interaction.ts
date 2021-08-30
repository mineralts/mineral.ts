import Message from './Message'
import GuildMember from '../entities/GuildMember'
import Guild from './Guild'
import InteractionMessageOptions from './InteractionMessageOptions'
import { InteractionComponentType } from '../../types'

export default interface Interaction {
  version: number
  token: string
  message: Message | null
  member: GuildMember
  guild: Guild
  customId: string
  interactionType: InteractionComponentType

  reply (options: InteractionMessageOptions): Promise<void>
  isMessageComponent(): boolean
  isButton (): boolean
  isSelectMenu(): boolean
}