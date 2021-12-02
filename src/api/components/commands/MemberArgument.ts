import { CommandArgumentType } from '../../../types'

export default class MemberArgument {
  public name!: string
  public description!: string
  public isRequired = false
  public readonly type: keyof typeof CommandArgumentType = 'USER'

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
}