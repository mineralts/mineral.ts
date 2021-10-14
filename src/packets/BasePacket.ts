import Client from '../clients/MineralClient'

export default abstract class BasePacket {
  public packetType!: string
  public abstract handle (client: Client, payload: any): Promise<void>
}