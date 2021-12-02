import BasePacket from './BasePacket'
import MineralClient from '../clients/MineralClient'
import Packet from '../decorators/Packet'
import TextChannel from '../api/entities/channels/TextChannel'
import Emoji from '../api/entities/Emoji'
import Reaction from '../api/entities/Reaction'

@Packet('MESSAGE_REACTION_ADD')
export default class MessageReactionAddPacket extends BasePacket {
  public async handle (client: MineralClient, payload: any) {
    const guild = client.cacheManager.guilds.cache.get(payload.guild_id)!
    const channel = guild.channels.cache.get(payload.channel_id) as TextChannel
    const message = channel.messages.cache.get(payload.message_id)

    if (!message) {
      return
    }

    const member = guild.members.cache.get(payload.user_id)!
    const emoji = new Emoji(payload.emoji.id, payload.emoji.name, false, true, payload.animated)
    const reaction: Reaction = new Reaction(emoji, member)

    message?.reactions.addReaction(emoji, member)

    client.emit('messageReactionAdd', message, reaction)
  }
}