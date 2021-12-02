import {
  ChannelTypeResolvable,
  CommandArgumentType,
  CommandParamsResolvable,
  CommandType,
  Snowflake
} from '../../../types'
import Guild from '../../entities/Guild'
import StringArgument from './StringArgument'
import NumberArgument from './NumberArgument'
import ChoiceArgument from './ChoiceArgument'
import MemberArgument from './MemberArgument'
import ChannelArgument from './ChannelArgument'
import SubCommandArgument from './SubCommandArgument'

export default class Command {
  public id?: Snowflake
  public type?: keyof typeof CommandType
  public name?: string
  public description?: string
  public defaultPermission = true
  public arguments: (CommandParamsResolvable | SubCommandArgument)[] = []
  public guild?: Guild

  public setType (type: keyof typeof CommandType) {
    this.type = type
    return this
  }

  public setName (name: string) {
    this.name = name.toLowerCase()
    return this
  }

  public setDescription (value: string) {
    this.description = value
    return this
  }

  public createSubCommand (callback: (command: SubCommandArgument) => void) {
    const argument = new SubCommandArgument()
    callback(argument)
    this.arguments.push(argument)
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

  public toJson () {
    return {
      type: CommandType[this.type!],
      name: this.name,
      description: this.description,
      options: this.arguments.map((argument: CommandParamsResolvable | SubCommandArgument) => {
        if (argument instanceof SubCommandArgument) {
          return {
            name: argument.name,
            description: argument.description,
            type: CommandArgumentType[argument.type],
            options: argument.arguments.map((argument: CommandParamsResolvable) => {
              return {
                ...argument,
                name: argument.name,
                description: argument.description,
                type: CommandArgumentType[argument.type!],
                required: argument.isRequired,
                channel_types: argument instanceof ChannelArgument
                  ? argument.channelTypes.map((channelType: keyof typeof ChannelTypeResolvable) => ChannelTypeResolvable[channelType])
                  : undefined
              }
            })
          }
        }
        return {
          ...argument,
          name: argument.name,
          description: argument.description,
          type: CommandArgumentType[argument.type!],
          required: argument.isRequired,
          channel_types: argument instanceof ChannelArgument
            ? argument.channelTypes.map((channelType: keyof typeof ChannelTypeResolvable) => ChannelTypeResolvable[channelType])
            : undefined
        }
      })
    }
  }
}