import BasePacket from './BasePacket'
import Client from '../client/Client'

export default class VoiceJoinPacket extends BasePacket {
  public packetType: string = 'VOICE_STATE_UPDATE'

  public async handle (client: Client, payload: any): Promise<void> {
    if (!payload.channel_id) {
      return
    }

    const guild = client.cacheManager.guilds.get(payload.guild_id)
    const member = guild?.members.get(payload.member.user.id)
    member?._patch({
      sessionId: payload.session_id,
      isDeaf: payload.deaf,
      isMute: payload.mute,
      isSelfDeaf: payload.self_deaf,
      isSelfMute: payload.self_mute,
      isSelfVideo: payload.self_video,
      isSuppress: payload.suppress,
      voiceChannel: client.cacheManager.channels.get(payload.channel_id)
    })

    client.emit('voiceJoin', member)
  }
}