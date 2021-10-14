import { ArgumentType } from '../../../types'

export default class ChannelArgument {
  public type: ArgumentType = ArgumentType.CHANNEL
  public name: string
  public description: string
  public required: boolean

  constructor (options: { name: string, description: string, required?: boolean }) {
    this.name = options.name
    this.description = options.description
    this.required = options.required || false
  }
}