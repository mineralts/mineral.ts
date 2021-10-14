import { ArgumentType } from '../../../types'

export default class SubCommandGroup {
  public name: string
  public description: string
  public type: ArgumentType = ArgumentType.SUB_COMMAND_GROUP
  public options: any[]
  public required: boolean

  constructor (options: { name: string, description: string, options?: any[], required?: boolean }) {
    this.name = options.name
    this.description = options.description
    this.options = options.options || []
    this.required = options.required || false
  }
}