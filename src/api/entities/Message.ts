import { NumericChannelInstance, Snowflake } from '../../types'
import MessageMentions from './MessageMentions'
import Member from './Member'
import Global from '../../utils/Global'
import Logger from '@leadcodedev/logger'
import Request from '../../rest/Request'
import { ChannelResolvable } from '../interfaces/ChannelResolvable'

export default class Message {
  constructor (
    public id: Snowflake,
    public type: NumericChannelInstance,
    public content: string,
    public isTTS: boolean,
    public mentions: MessageMentions,
    public channel: ChannelResolvable | undefined,
    public replied: Message | undefined,
    public isReply: boolean,
    public author: Member,
  ) {}

  public async delete (options: { timeout: number }) {
    const request = new Request(`/channels/${this.channel!.id}/messages/${this.id}`)
    if (options.timeout) {
      setTimeout(async () => await request.delete(), options.timeout)
    } else {
      await request.delete()
    }
  }

  public async edit (value: string, options: { timeout: number }) {
    if (this.author.user.id !== Global.getSharedItem().get('botId')) {
      Logger.send('error', 'A message can only be edited by its author')
      return
    }

    const request = new Request(`/channels/${this.channel!.id}/messages/${this.id}`)
    if (options.timeout) {
      setTimeout(async () => {
        await request.update({
          content: value
        })
      }, options.timeout)
    } else {
      await request.update({
        content: value
      })
    }
  }

  /**
   * @Todo Fix error 400
   */
  public async pin (): Promise<void> {
    const request = new Request(`/channels/${this.channel?.id}/pins/${this.id}`)
    await request.update()
  }
}