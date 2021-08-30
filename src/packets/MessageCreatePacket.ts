import BasePacket from './BasePacket'
import Client from '../client/Client'

export default class MessageCreatePacket extends BasePacket {
  public packetType: string = 'MESSAGE_CREATE'

  public async handle (client: Client, payload): Promise<void> {
    console.log(payload)
    if (payload.type === 0) {
      const message = client.messageManager.create(payload)
      client.emit('messageCreate', message)
    }
  }
}