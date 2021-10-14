import Collection from '@discordjs/collection'
import Emoji from '../../../srcold/api/entities/Emoji'
import { Snowflake } from '../../types'

export default class GuildEmojiManager {
  public cache: Collection<Snowflake, Emoji> = new Collection()
  
}