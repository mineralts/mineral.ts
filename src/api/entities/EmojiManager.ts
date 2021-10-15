import Collection from '@discordjs/collection'
import { Snowflake } from '../../types'
import Emoji from './Emoji'

export default class EmojiManager {
  public cache: Collection<Snowflake, Emoji> = new Collection()

  public register (emojis: Emoji[]) {
    emojis.forEach((emoji: Emoji) => {
      this.cache.set(emoji.id, emoji)
    })
    return this
  }
}