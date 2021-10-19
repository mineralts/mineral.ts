import { ButtonStyle } from '../../../types'
import BaseButton from './BaseButton'
import Emoji from '../../entities/Emoji'

export default class ButtonLink extends BaseButton {
  public url?: string

  constructor (
    props?: {
      label?: string,
      emoji?: string | Emoji,
      url: string
      disabled?: boolean
    }
  ) {
    if (props) super(ButtonStyle.LINK, props.label, undefined, props.disabled)
    else super(ButtonStyle.LINK, undefined, undefined)

    if (props?.emoji) {
      this.emoji = this.parseEmoji(props.emoji) as any
    }

    if (props?.url) {
      this.url = props.url
    }
  }

  public setUrl (url: string) {
    this.url = url
    return this
  }

  public toJson () {
    return {
      ...super.toJson(),
      url: this.url
    }
  }
}