import Client from '../../client/Client'
import { PartialType } from '../../types'

export default class BaseEntity {
  constructor (private client: Client) {
  }

  public getChannel (data: any) {
    const channelId = data.channel_id ?? data.id;
    this.client.cacheManager.channels.get(channelId)
  }
}