import BasePacket from './BasePacket'
import MineralClient from '../clients/MineralClient'
import Packet from '../decorators/Packet'
import TextChannel from '../api/entities/TextChannel'
import Reaction from '../api/entities/Reaction'

@Packet('MESSAGE_REACTION_REMOVE')
export default class MessageReactionRemovePacket extends BasePacket {
  public async handle (client: MineralClient, payload: any) {
    const guild = client.cacheManager.guilds.cache.get(payload.guild_id)
    const channel = guild?.channels.cache.get(payload.channel_id) as TextChannel
    const message = channel.messages.cache.get(payload.message_id)

    if (!message) {
      return
    }


    const reactions = message.reactions.cache.get(payload.user_id)
    const targetReaction = reactions?.find((reaction: Reaction) => reaction.emoji.label === payload.emoji.name)

    if (!targetReaction) {
      return
    }

    const index = reactions!.indexOf(targetReaction)
    const reaction = reactions?.splice(index!, 1) as unknown as Reaction

    if (!reactions?.length) {
      message.reactions.cache.delete(payload.user_id)
    }

    client.emit('messageReactionRemove', message, reaction)
  }
}