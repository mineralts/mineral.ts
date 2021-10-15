import Collection from '@discordjs/collection'
import BasePacket from '../packets/BasePacket'
import ReadyPacket from './ReadyPacket'
import GuildCreatePacket from './GuildCreatePacket'
import { MessagePacket } from './MessagePacket'

export default class PacketManager {
  public packets: Collection<string, BasePacket[]> = new Collection()

  constructor () {
    this.register(
      new ReadyPacket(),
      new GuildCreatePacket(),
      new MessagePacket(),
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