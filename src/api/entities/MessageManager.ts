import Collection from '@discordjs/collection'
import { Snowflake } from '../../types'
import { Message } from './Message'

export class MessageManager {
  public cache: Collection<Snowflake, Message> = new Collection()
}