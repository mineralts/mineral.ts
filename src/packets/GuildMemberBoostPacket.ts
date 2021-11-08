import BasePacket from "./BasePacket";
import Client from "../clients/MineralClient";

export default class GuildMemberBoostPacket extends BasePacket {
  public packetType: string = 'GUILD_UPDATE'

  public async handle (client: Client, payload: any) {
    const guild = client.cacheManager.guilds.cache.get(payload.guild_id)
    const member = guild!.members.cache.get(payload.guild_id)!

    if (!payload.premium_since) {
      return
    }

    client.emit('memberBoostGuild', member)
  }
}
