import Client from '../client/Client'

export default abstract class BasePacket {
  public abstract packetType: string
  public abstract handle (client: Client, payload: any): Promise<void>
}