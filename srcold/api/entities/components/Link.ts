import { ButtonStyle, ComponentType } from '../../../types'

export default class Link {
  private type: ComponentType = ComponentType.BUTTON
  private style: ButtonStyle = 5
  public label: string
  public emoji?: any
  public url?: string
  public disabled?: boolean

  constructor (
    props: {
      label: string,
      emoji?: any,
      url?: string
      disabled?: boolean
    }
  ) {
    this.label = props.label
    this.emoji = props.emoji
    this.url = props.url
    this.disabled = props.disabled
  }
}