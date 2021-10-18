import { ButtonStyle, ComponentType } from '../../types'
import Emoji from '../entities/Emoji'
import { parseEmoji } from '../../../utils'

export default class Button {
  private type: ComponentType = ComponentType.BUTTON
  private style: ButtonStyle
  public label: string | undefined
  public emoji?: any
  public custom_id?: string
  public disabled?: boolean

  constructor (
    props: {
      style: keyof typeof ButtonStyle
      label?: string,
      emoji?: any,
      customId?: string
      disabled?: boolean
    }
  ) {
    this.style = ButtonStyle[props.style]
    this.label = props.label || undefined
    this.emoji = this.parseEmoji(props.emoji)
    this.custom_id = props.customId
    this.disabled = props.disabled
  }

  private parseEmoji (emoji: string | Emoji) {
    if (typeof emoji === 'string') {
      return parseEmoji(emoji)
    }
  }
}