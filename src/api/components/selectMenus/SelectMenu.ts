import { ComponentType, MenuSelect, MenuSelectOption } from '../../../types'

export default class SelectMenu {
  public type: ComponentType = ComponentType.SELECT_MENU
  public customId?: string
  public minValues?: number = 1
  public maxValues?: number = 1
  public placeholder?: string
  public disabled?: boolean = false
  public options: MenuSelectOption[] = []

  constructor (options?: MenuSelect) {
    if (options) {
      this.customId = options?.customId
      this.minValues = options?.minValues
      this.maxValues = options?.maxValues
      this.placeholder = options?.placeholder
      this.disabled = options?.disabled
    }
  }

  public setCustomId (identifier: string) {
    this.customId = identifier
    return this
  }

  public setMinimalValue (value: number) {
    this.minValues = value
    return this
  }

  public setMaximalValue (value: number) {
    this.maxValues = value
    return this
  }

  public setPlaceholder (value: string) {
    this.placeholder = value
    return this
  }

  public setDisabled (value: boolean) {
    this.disabled = value
    return this
  }

  public addOption (option: { label: string, value: unknown, description?: string, emoji?: any, default?: boolean }) {
    this.options.push(option)
    return this
  }

  public toJson () {
    return {
      type: this.type,
      custom_id: this.customId,
      min_values: this.minValues,
      max_values: this.maxValues,
      placeholder: this.placeholder,
      disabled: this.placeholder,
    }
  }
}