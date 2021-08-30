import BasePacket from './BasePacket'
import Client from '../client/Client'

export default class VoiceStateUpdatePacket extends BasePacket {
  public packetType: string = 'VOICE_STATE_UPDATE'

  public async handle (client: Client, payload: any): Promise<void> {
    const guild = client.cacheManager.guilds.get(payload.guild_id)
    const before = guild?.members.get(payload.member.user.id)?.clone()

    const after = guild?.members.get(payload.member.user.id)
    after?._patch({
      sessionId: payload.session_id,
      isDeaf: payload.deaf,
      isMute: payload.mute,
      isSelfDeaf: payload.self_deaf,
      isSelfMute: payload.self_mute,
      isSelfVideo: payload.self_video,
      isSuppress: payload.suppress,
    })
    client.emit('voiceStateUpdate', before, after)
  }
}