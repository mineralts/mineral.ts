import { CommandArgumentType, CommandParamsResolvable } from '../../../types'
import StringArgument from './StringArgument'
import NumberArgument from './NumberArgument'
import ChoiceArgument from './ChoiceArgument'
import MemberArgument from './MemberArgument'
import ChannelArgument from './ChannelArgument'

export default class SubCommandArgument {
  public type: keyof typeof CommandArgumentType = 'SUB_COMMAND'
  public name!: string
  public description!: string
  public arguments: CommandParamsResolvable[] = []
  public defaultPermission = true

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

  public addNumberArgument (callback: (argument: NumberArgument) => void) {
    const argument = new NumberArgument()
    callback(argument)
    this.arguments.push(argument)
    return this
  }

  public addChoiceArgument (callback: (argument: ChoiceArgument) => void) {
    const argument = new ChoiceArgument()
    callback(argument)
    this.arguments.push(argument)
    return this
  }

  public addMemberArgument (callback: (argument: MemberArgument) => void) {
    const argument = new MemberArgument()
    callback(argument)
    this.arguments.push(argument)
    return this
  }

  public addChannelArgument (callback: (argument: ChannelArgument) => void) {
    const argument = new ChannelArgument()
    callback(argument)
    this.arguments.push(argument)
    return this
  }

  public setDefaultPermission (value: boolean) {
    this.defaultPermission = value
    return this
  }
}