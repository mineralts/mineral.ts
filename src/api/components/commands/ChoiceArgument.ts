import { ChoiceOption, CommandArgumentType } from '../../../types'

export default class ChoiceArgument {
  public name!: string
  public description!: string
  public isRequired = false
  public type!: Exclude<keyof typeof CommandArgumentType, ['INTEGER']>
  public choices: ChoiceOption[] = []

  public setType (type: Exclude<keyof typeof CommandArgumentType, ['INTEGER', 'SUB_COMMAND', 'SUB_COMMAND_GROUP', 'USER', 'CHANNEL', 'MENTIONABLE']>) {
    this.type = type
    return this
  }

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

  public addOption (name: string, value: string | number | boolean) {
    this.choices.push({ name, value })
    return this
  }
}