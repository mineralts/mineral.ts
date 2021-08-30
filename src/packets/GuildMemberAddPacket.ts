import BasePacket from './BasePacket'
import Client from '../client/Client'

export default class GuildMemberAddPacket extends BasePacket {
  packetType: string = ''

  handle (client: Client, payload: any): Promise<void> {
    return Promise.resolve(undefined);
  }

}