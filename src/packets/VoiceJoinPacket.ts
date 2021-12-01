import BasePacket from './BasePacket'
import MineralClient from '../clients/MineralClient'
import VoiceState from '../api/entities/VoiceState'
import VoiceChannel from '../api/entities/channels/VoiceChannel'
import Packet from '../decorators/Packet'

@Packet('VOICE_STATE_UPDATE')
export default class VoiceJoinPacket extends BasePacket {
  public async handle (client: MineralClient, payload: any): Promise<void> {
    if (!payload.channel_id) {
      return
    }

    const guild = client.cacheManager.guilds.cache.get(payload.guild_id)
    const voiceChannel = guild?.channels.cache.get(payload.channel_id) as VoiceChannel
    const member = guild?.members.cache.get(payload.member.user.id)

    const voiceState = new VoiceState(
      member!,
      payload.session_id,
      payload.suppress,
      payload.self_video,
      payload.mute,
      payload.self_deaf,
      payload.channel_id,
      voiceChannel,
      guild!,
    )

    if (member) {
      member.voice = voiceState
    }

    client.emit('voiceJoin', member!)
  }
}