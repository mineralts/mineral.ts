import { ArgumentType } from '../../../types'

export default class ChoiceArgument {
  public type: ArgumentType = ArgumentType.SELECT_MENU
  public name: string
  public min_values: number
  public max_values: number
  public description: string
  public required: boolean
  public choices: any[] = []

  constructor (options: { name: string, required: boolean, minValue?: number, maxValue?: number, description?: string }) {
    this.name = options.name
    this.min_values = options.minValue || 1
    this.max_values = options.maxValue || 1
    this.description = options.description || ''
    this.required = options.required || false
  }

  public addOption (option: { name: string, value: unknown }) {
    this.choices.push({
      ...option,
      value: (option.value as any).toString()
    })
    return this
  }
}