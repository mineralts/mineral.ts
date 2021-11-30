import { Snowflake } from '../../types'
import Emoji from './Emoji'
import Collection from '../../Collection'

export default class GuildEmojiManager {
  public cache: Collection<Snowflake, Emoji> = new Collection()

  public register (emojis: Collection<Snowflake, Emoji>) {
    this.cache = emojis
    return this
  }
}