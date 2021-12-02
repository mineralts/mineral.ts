import { ChannelTypeResolvable, CommandArgumentType } from '../../../types'

export default class ChannelArgument {
  public name!: string
  public description!: string
  public isRequired = false
  public channelTypes: (keyof typeof ChannelTypeResolvable)[] = []
  public readonly type: keyof typeof CommandArgumentType = 'CHANNEL'

  public setName (value: string) {
    this.name = value.toLowerCase()
    return this
  }

  public setDescription (value: string) {
    this.description = value
    return this
  }

  public setRequired (value: boolean) {
    this.isRequired = value
    return this
  }

  public setAllowChannels (...channels: (keyof typeof ChannelTypeResolvable)[]) {
    channels.forEach((channel: keyof typeof ChannelTypeResolvable) => {
      this.channelTypes.push(channel)
    })
  }
}