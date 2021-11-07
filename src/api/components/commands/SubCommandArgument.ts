import { CommandArgumentType, CommandParamsResolvable } from '../../../types'
import StringArgument from './StringArgument'

export default class SubCommandArgument {
  public type: keyof typeof CommandArgumentType = 'SUB_COMMAND'
  public name!: string
  public description!: string
  public arguments: CommandParamsResolvable[] = []

  public setName (name: string) {
    this.name = name.toLowerCase()
    return this
  }

  public setDescription (value: string) {
    this.description = value
    return this
  }

  public addStringArgument (callback: (argument: StringArgument) => void) {
    const argument = new StringArgument()
    callback(argument)
    this.arguments.push(argument)
    return this
  }
}