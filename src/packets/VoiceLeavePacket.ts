import BasePacket from './BasePacket'
import Client from '../client/Client'

export default class VoiceLeavePacket extends BasePacket {
  public packetType: string = 'VOICE_STATE_UPDATE'

  public async handle (client: Client, payload: any): Promise<void> {
    const guild = client.cacheManager.guilds.get(payload.guild_id)
    const oldMember = guild?.members.get(payload.member.user.id)?.clone()

    if (!oldMember?.voiceChannel || oldMember?.voiceChannel?.id === payload.channel_id) {
      return
    }

    const newMember = guild?.members.get(payload.member.user.id)
    newMember?._patch({
      sessionId: payload.session_id,
      isDeaf: payload.deaf,
      isMute: payload.mute,
      isSelfDeaf: payload.self_deaf,
      isSelfMute: payload.self_mute,
      isSelfVideo: payload.self_video,
      isSuppress: payload.suppress,
      voiceChannel: null
    })

    client.emit('voiceLeave', newMember, oldMember?.voiceChannel)
  }
}