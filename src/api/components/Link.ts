import { ButtonStyle, ComponentType } from '../../types'
import Emoji from '../../../srcold/api/entities/Emoji'
import { parseEmoji } from '../../../utils'

export default class Link {
  private type: ComponentType = ComponentType.BUTTON
  private style: ButtonStyle = 5
  public label: string
  public emoji?: string | Emoji
  public url: string
  public disabled?: boolean

  constructor (
    props: {
      label: string,
      emoji?: string | Emoji,
      url: string
      disabled?: boolean
    }
  ) {
    this.label = props.label
    this.emoji = this.parseEmoji(props.emoji)
    this.url = props.url
    this.disabled = props.disabled
  }

  private parseEmoji (emoji?: string | Emoji) {
    if (typeof emoji === 'string') {
      return parseEmoji(emoji)
    }
  }
}