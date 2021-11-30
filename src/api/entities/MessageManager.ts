import { RequestOptions, Snowflake } from '../../types'
import Message from './Message'
import Request from '../../sockets/Request'
import { createMessageFromPayload } from '../../utils/Builders'
import TextChannel from './channels/TextChannel'
import Collection from '../../Collection'

export default class MessageManager {
  public cache: Collection<Snowflake, Message> = new Collection()

  constructor (private channel?: TextChannel) {
  }

  public async fetch (id?: Snowflake, option?: RequestOptions): Promise<MessageManager> {
    if (id) {
      const request = new Request(`/channels/${this.channel?.id}/messages/${id}`)
      const payload = await request.get(option)
      this.instantiate(payload)
      return this
    }

    const request = new Request(`/channels/${this.channel?.id}/messages`)
    const payload = await request.get(option)

    payload.forEach((item) => this.instantiate(item))

    return this
  }

  private instantiate (payload) {
    const message = createMessageFromPayload({
      ...payload,
      guild_id: this.channel?.guild.id
    })

    this.cache.set(message.id, message)
  }
}