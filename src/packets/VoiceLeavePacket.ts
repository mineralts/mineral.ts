import BasePacket from './BasePacket'
import MineralClient from '../clients/MineralClient'
import Packet from '../decorators/Packet'

@Packet('VOICE_STATE_UPDATE')
export default class VoiceLeavePacket extends BasePacket {
  public async handle (client: MineralClient, payload: any): Promise<void> {

    const guild = client?.cacheManager.guilds.cache.get(payload.guild_id)!
    const oldMember = guild.members.cache.get(payload.member.user.id)

    if (!oldMember?.voice?.channel || oldMember?.voice.channel?.id === payload.channel_id) {
      return
    }

    const member = guild.members.cache.get(payload.member.user.id)

    client.emit('voiceLeave', member!)
  }
}