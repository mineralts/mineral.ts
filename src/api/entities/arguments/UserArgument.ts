import { ArgumentType } from '../../../types'

export default class UserArgument {
  public type: ArgumentType = ArgumentType.USER
  public name: string
  public description: string
  public required: boolean

  constructor (options: { name: string, description: string, required?: boolean }) {
    this.name = options.name
    this.description = options.description
    this.required = options.required || false
  }
}