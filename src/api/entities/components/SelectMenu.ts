import { ComponentType, MenuSelect, MenuSelectOption } from '../../../types'

export default class SelectMenu {
  public type: ComponentType = ComponentType.SELECT_MENU
  public custom_id: string
  public min_values?: number = 1
  public max_values?: number = 1
  public placeholder?: string
  public disabled = false
  public options: MenuSelectOption[] = []

  constructor (options: MenuSelect) {
    this.custom_id = options.customId
    this.min_values = options.minValues
    this.max_values = options.maxValues
    this.placeholder = options.placeholder
  }

  public addOption (option: { label: string, value: unknown, description?: string, emoji?: any, default?: boolean }) {
    this.options.push(option)
    return this
  }
}