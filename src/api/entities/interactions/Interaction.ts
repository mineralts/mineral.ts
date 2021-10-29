import { ComponentType, InteractionType, Snowflake } from '../../../types'
import Message from '../Message'
import GuildMember from '../GuildMember'

export default class Interaction {
  constructor (
    public id: Snowflake,
    public version: number,
    public type: keyof typeof InteractionType,
    public token: string,
    public customId: string | undefined,
    public componentType: keyof typeof ComponentType,
    public message: Message,
    public member: GuildMember
  ) {
  }
}