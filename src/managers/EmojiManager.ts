import Collection from '@discordjs/collection'
import { Snowflake } from '../types'
import Client from '../client/Client'
import Emoji from '../api/entities/Emoji'

export default class EmojiManager {
  public emojiCollection: Collection<Snowflake, Emoji> = new Collection()

  constructor (private client: Client) {
  }

  public create (emoji: any) {
    const emojiCollection: Collection<Snowflake, Emoji> = new Collection()

    emojiCollection.set(emoji.id, new Emoji(
      emoji.id,
      emoji.name,
      emoji.roles.map((roleId: Snowflake) => this.client.cacheManager.roles.get(roleId)),
      emoji.require_colons,
      emoji.managed,
      emoji.animated,
      emoji.available,
    ))

    this.client.cacheManager.emojis = this.client.cacheManager.emojis.concat(emojiCollection)

    return emojiCollection
  }

  public insertIntoCache (emojis: any[]) {
    emojis.forEach((emoji: any) => {
      this.emojiCollection.set(emoji.id, new Emoji(
        emoji.id,
        emoji.name,
        emoji.roles.map((roleId: Snowflake) => this.client.cacheManager.roles.get(roleId)),
        emoji.require_colons,
        emoji.managed,
        emoji.animated,
        emoji.available,
      ))
    })

    this.client.cacheManager.emojis = this.client.cacheManager.emojis.concat(this.emojiCollection)
    return this.client.cacheManager.emojis
  }
}