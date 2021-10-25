import { ComponentType, MenuSelect, MenuSelectOption } from '../../../types'
import Emoji from '../../entities/Emoji'
import { parseEmoji } from '../../../utils'
import Logger from '@leadcodedev/logger'

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
    if (!this.customId) {
      Logger.send('error', `Select menu component has not customId.`)
      process.exit(0)
    }

    return {
      type: this.type,
      custom_id: this.customId,
      min_values: this.minValues,
      max_values: this.maxValues,
      placeholder: this.placeholder,
      disabled: this.disabled,
      options: this.options.map((option: MenuSelectOption) => ({
        label: option.label,
        value: option.value,
        description: option.description,
        emoji: option.emoji
          ? this.parseEmoji(option.emoji)
          : null,
        default: option.default,
      })),
    }
  }

  protected parseEmoji (emoji: string | Emoji) {
    if (typeof emoji === 'string') {
      return parseEmoji(emoji)
    }
  }
}