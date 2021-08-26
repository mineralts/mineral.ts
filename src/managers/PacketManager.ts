import Collection from '@discordjs/collection'
import BasePacket from '../packets/BasePacket'
import ReadyPacket from '../packets/ReadyPacket'
import MessageCreatePacket from '../packets/MessageCreatePacket'
import GuildCreatePacket from '../packets/GuildCreatePacket'

export default class PacketManager {
  public packets: Collection<string, BasePacket> = new Collection()

  constructor () {
    this.register(
      new ReadyPacket(),
      new MessageCreatePacket(),
      new GuildCreatePacket(),
    )
  }

  public register (...packets: BasePacket[]) {
    packets.forEach((packet: BasePacket) => this.packets.set(packet.packetType, packet))
  }
}