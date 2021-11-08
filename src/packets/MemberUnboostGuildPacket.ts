import BasePacket from "./BasePacket";
import MineralClient from "../clients/MineralClient";
import Packet from "../decorators/Packet";

@Packet('MEMBER_UNBOST_GUILD')
export class MemberUnboostGuildPacket extends BasePacket {

  public async handle(client: MineralClient, payload: any) {
    const guild = client.cacheManager.guilds.cache.get(payload.guild_id)
    const member = guild?.members.cache.get(payload.user_id)!

    if (!payload.premiumSince) {
      return
    }

    client.emit('memberUnboostGuild', member)
  }
}
