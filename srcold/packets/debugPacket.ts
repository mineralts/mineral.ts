import BasePacket from './BasePacket'
import Client from '../client/Client'

export default class DebugPacket extends BasePacket {
  public packetType: string = 'debug'

  public async handle (client: Client, payload: any): Promise<void> {
    client.emit('debug', payload)
  }
}