import Message from '../entities/Message'
import Context from '../../Context'
import { MessageCollectorOption } from '../../types'
import { EventEmitter } from 'events'
import { v4 } from 'uuid'
import Scheduler from './Scheduler'
import influer from 'influer'
import BaseTextualChannel from '../entities/channels/BaseTextualChannel'

export class MessageCollector extends EventEmitter {
  private uuid: v4 = new v4()
  private scheduler: Scheduler | undefined

  constructor (
    private channel: BaseTextualChannel,
    private options?: MessageCollectorOption,
  ) {
    super()
  }

  protected getInfluer () {
    return influer<{ messages: Message[] }>({ messages: [] })
  }

  public collect (callback?: (message: Message) => Promise<void>) {
    const client = Context.getClient()
    const { state } = this.getInfluer()

    if (this.options?.duration) {
      this.scheduler = new Scheduler(this.options.duration)
      this.scheduler.timeout(() => {
        this.emit(`${this.uuid}-end`, state.messages)
      })
    }

    client.on('messageCreate', async (message: Message) => {
      if (message.channel?.id !== this.channel.id) {
        return
      }

      if (this.options?.duration && this.scheduler?.ended) {
        return
      }

      if (this.options?.maxMessage && state.messages.length < this.options.maxMessage) {
        state.messages.push(message)
      }

      if (!this.options?.maxMessage) {
        state.messages.push(message)
      }

      if (callback) {
        await callback(message)
      }
    })
    return this
  }

  public end (callback: (messages: Message[]) => Promise<void>) {
    this.on(`${this.uuid}-end`, callback)
  }
}