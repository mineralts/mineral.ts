import MineralClient from '../clients/MineralClient'
import SocketManager from './SocketManager'

export class Socket {
  public socketManager: SocketManager = new SocketManager(this)

  constructor (public client: MineralClient) {
  }
}