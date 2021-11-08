import Collection from '@discordjs/collection'
import BasePacket from '../packets/BasePacket'
import ReadyPacket from './ReadyPacket'
import GuildCreatePacket from './GuildCreatePacket'
import { MessagePacket } from './MessagePacket'
import MessageReactionAddPacket from './MessageReactionAddPacket'
import MessageReactionRemovePacket from './MessageReactionRemovePacket'
import PresenceUpdatePacket from './PresenceUpdatePacket'
import MessageUpdatePacket from './MessageUpdatePacket'
import VoiceJoinPacket from './VoiceJoinPacket'
import MessageDeletePacket from './MessageDeletePacket'
import ChannelCreatePacket from './ChannelCreatePacket'
import ChannelDeletePacket from './ChannelDeletePacket'
import ChannelUpdatePacket from './ChannelUpdatePacket'
import CommandInteractionCreatePacket from './CommandInteractionCreatePacket'
import MessageInteractionCreatePacket from './MessageInteractionCreatePacket'
import MemberBoostGuildPacket from "./MemberBoostGuildPacket";
import {MemberUnboostGuildPacket} from "./MemberUnboostGuildPacket";

export default class PacketManager {
  public packets: Collection<string, BasePacket[]> = new Collection()

  constructor () {
    this.register(
      new ReadyPacket(),
      new GuildCreatePacket(),
      new MessagePacket(),
      new MessageReactionAddPacket(),
      new MessageReactionRemovePacket(),
      new PresenceUpdatePacket(),
      new MessageUpdatePacket(),
      new VoiceJoinPacket(),
      new MessageDeletePacket(),
      new ChannelCreatePacket(),
      new ChannelDeletePacket(),
      new ChannelUpdatePacket(),
      new CommandInteractionCreatePacket(),
      new MessageInteractionCreatePacket(),
      new MemberBoostGuildPacket(),
      new MemberUnboostGuildPacket()
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
