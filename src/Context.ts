import MineralClient from './clients/MineralClient'

export default class Context {
  private static $instance: Context

  constructor (public client: MineralClient) {
  }

  private static getInstance (client?: MineralClient) {
    if (client && !this.$instance) {
      this.$instance = new Context(client)
    }
    return this.$instance
  }

  public static getClient (): MineralClient {
    return this.getInstance().client
  }

  public static init (client: MineralClient) {
    this.getInstance(client)
  }
}