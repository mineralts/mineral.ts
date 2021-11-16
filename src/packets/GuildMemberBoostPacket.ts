import BasePacket from "./BasePacket";
import Client from "../clients/MineralClient";
import Packet from '../decorators/Packet'

@Packet('GUILD_UPDATE')
export default class GuildMemberBoostPacket extends BasePacket {
  public async handle (client: Client, payload: any) {
    if (!payload.user) {
      return
    }

    const guild = client.cacheManager.guilds.cache.get(payload.guild_id)
    const member = guild!.members.cache.get(payload.user.id)!

    if (!payload.premium_since) {
      return
    }

    client.emit('memberBoostGuild', member)
  }
}
