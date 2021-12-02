import BasePacket from '../packets/BasePacket'
import ReadyPacket from './ReadyPacket'
import GuildCreatePacket from './GuildCreatePacket'
import { MessageCreatePacket } from './MessageCreatePacket'
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
import MemberBoostAdd from './MemberBoostAdd'
import RulesAcceptPacket from './RulesAcceptPacket'
import MemberJoinPacket from './MemberJoinPacket'
import MemberLeavePacket from './MemberLeavePacket'
import MemberBoostRemove from './MemberBoostRemove'
import VoiceLeavePacket from './VoiceLeavePacket'
import Collection from '../Collection'
import InviteCreatePacket from './InviteCreatePacket'
import TypingStartPacket from './TypingStartPacket'
import RoleCreatePacket from './RoleCreatePacket'
import RoleDeletePacket from './RoleDeletePacket'
import RoleUpdatePacket from './RoleUpdatePacket'

export default class PacketManager {
  public packets: Collection<string, BasePacket[]> = new Collection()

  constructor () {
    this.register(
      new ReadyPacket(),
      new MemberJoinPacket(),
      new MemberLeavePacket(),
      new GuildCreatePacket(),
      new MessageCreatePacket(),
      new MessageReactionAddPacket(),
      new MessageReactionRemovePacket(),
      new PresenceUpdatePacket(),
      new MessageUpdatePacket(),
      new VoiceLeavePacket(),
      new VoiceJoinPacket(),
      new MessageDeletePacket(),
      new ChannelCreatePacket(),
      new ChannelDeletePacket(),
      new ChannelUpdatePacket(),
      new CommandInteractionCreatePacket(),
      new MessageInteractionCreatePacket(),
      new MemberBoostAdd(),
      new MemberBoostRemove(),
      new RulesAcceptPacket(),
      new InviteCreatePacket(),
      new TypingStartPacket(),
      new RoleCreatePacket(),
      new RoleUpdatePacket(),
      new RoleDeletePacket(),
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
