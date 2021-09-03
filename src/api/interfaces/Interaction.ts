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
  data: any

  reply (options: InteractionMessageOptions): Promise<void>
  // edit (options: InteractionMessageOptions): Promise<void>
  isMessage(): boolean
  isCommand(): boolean
  isButton (): boolean
  isSelectMenu(): boolean
}