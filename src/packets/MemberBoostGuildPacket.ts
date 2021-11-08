import Packet from "../decorators/Packet";
import BasePacket from "./BasePacket";
import MineralClient from "../clients/MineralClient";

@Packet('MEMBER_BOOST_GUILD')
export default class MemberBoostGuildPacket extends BasePacket {

  public async handle(client: MineralClient, payload: any){
    const guild = client.cacheManager.guilds.cache.get(payload.guild_id)
    const member = guild?.members.cache.get(payload.user_id)!

    if (!payload.premium_since) {
      return
    }

    client.emit('memberBoostGuild', member)
  }

}
