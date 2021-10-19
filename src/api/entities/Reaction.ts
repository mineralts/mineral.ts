import Emoji from './Emoji'
import GuildMember from './GuildMember'
import ClientUser from './ClientUser'

export default class Reaction {
  constructor (
    public emoji: Emoji,
    public member: GuildMember | ClientUser
  ) {
  }
}