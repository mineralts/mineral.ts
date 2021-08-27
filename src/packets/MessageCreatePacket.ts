import BasePacket from './BasePacket'
import Client from '../client/Client'

export default class MessageCreatePacket extends BasePacket {
  public packetType: string = 'MESSAGE_CREATE'

  public async handle (client: Client, payload): Promise<void> {
    const message = client.messageManager.create(payload)
    client.emit('messageCreate', message)
  }
}