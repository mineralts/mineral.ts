import Collection from '@discordjs/collection'
import BasePacket from '../packets/BasePacket'
import ReadyPacket from '../packets/ReadyPacket'
import MessageCreatePacket from '../packets/MessageCreatePacket'
import GuildCreatePacket from '../packets/GuildCreatePacket'
import InteractionPacket from '../packets/InteractionPacket'
import GuildSubscriptionUpPacket from '../packets/GuildSubscriptionUpPacket'
import GuildMemberUnBoostPacket from '../packets/GuildMemberUnBoostPacket'
import GuildMemberBoostPacket from '../packets/GuildMemberBoostPacket'
import GuildBoostAddPacket from '../packets/GuildBoostAddPacket'

export default class PacketManager {
  public packets: Collection<string, BasePacket[]> = new Collection()

  constructor () {
    this.register(
      new ReadyPacket(),
      new MessageCreatePacket(),
      new GuildCreatePacket(),
      new InteractionPacket(),
      new GuildMemberBoostPacket(),
      new GuildMemberUnBoostPacket(),
      new GuildSubscriptionUpPacket(),
      new GuildBoostAddPacket(),
    )
  }

  public register (...packets: BasePacket[]) {
    packets.forEach((packet: BasePacket) => {
      const packetEvent = this.packets.get(packet.packetType)
      if (!packetEvent) {
        this.packets.set(packet.packetType, [packet])
      } else {
        packetEvent.push(packet)
      }
    })
  }
}