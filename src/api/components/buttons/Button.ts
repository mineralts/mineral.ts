import { ButtonStyle } from '../../../types'
import Emoji from '../../entities/Emoji'
import BaseButton from './BaseButton'

export default class Button extends BaseButton {
  public custom_id?: string

  constructor (
    props?: {
      style: keyof typeof ButtonStyle
      label?: string,
      emoji?: string | Emoji,
      customId?: string
      disabled?: boolean
    }
  ) {
    if (props) super(ButtonStyle.LINK, props.label, undefined, props.disabled)
    else super(ButtonStyle.LINK, undefined, undefined)

    if (props?.emoji) {
      this.emoji = this.parseEmoji(props.emoji)
    }

    if (props?.style) {
      this.style = ButtonStyle[props.style]
    }

    if (props?.customId) {
      this.custom_id = props?.customId
    }
  }

  public setStyle (style: keyof typeof ButtonStyle) {
    this.style = ButtonStyle[style]
    return this
  }

  public setLabel (value: string) {
    this.label = value
    return this
  }

  public setCustomId (identifier: string) {
    this.custom_id = identifier
    return this
  }

  public setDisabled (value: boolean) {
    this.disabled = value
    return this
  }

  public setEmoji (emoji: string | Emoji) {
    this.emoji = this.parseEmoji(emoji)
    return this
  }
}