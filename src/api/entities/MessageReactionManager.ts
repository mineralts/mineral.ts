import Collection from '@discordjs/collection'
import { RequestOptions, Snowflake } from '../../types'
import Reaction from './Reaction'
import Emoji from './Emoji'
import GuildMember from './GuildMember'
import ClientUser from './ClientUser'
import Request from '../../sockets/Request'
import Message from './Message'

export default class MessageReactionManager {
  public readonly cache: Collection<Snowflake, Reaction[]> = new Collection()

  constructor (private message: Message) {
  }

  public addReaction(emoji: Emoji, member: GuildMember | ClientUser) {
    const userReactions = this.cache.get(member.user.id)
    const reaction = new Reaction(emoji, member)

    if (!userReactions) {
      this.cache.set(member.user.id, [reaction])
      return
    }
    userReactions.push(reaction)
  }

  public async remove (member: Snowflake | GuildMember | ClientUser, option?: RequestOptions) {
    const snowflake = member instanceof GuildMember || member instanceof ClientUser
      ? member.user.id
      : member

    const memberReactions = this.cache.get(snowflake)
    if (memberReactions?.length) {
      await Promise.all(
        memberReactions.map(async (reaction: Reaction) => {
          const encodedEmoji = encodeURI(reaction.emoji.id ? `${reaction.emoji.label}:${reaction.emoji.id}` : reaction.emoji.label)
          const request = new Request(`/channels/${this.message.channel?.id}/messages/${this.message.id}/reactions/${encodedEmoji}/${snowflake}`)
          return request.delete(option)
        })
      )
    }
  }
}