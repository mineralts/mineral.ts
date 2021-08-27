import { ButtonStyle, ComponentType } from '../../../types'

export default class Button {
  private type: ComponentType = ComponentType.BUTTON
  private style: ButtonStyle
  public label: string
  public emoji?: any
  public custom_id?: string
  public disabled?: boolean

  constructor (
    props: {
      style: ButtonStyle
      label: string,
      emoji?: any,
      customId?: string
      disabled?: boolean
    }
  ) {
    this.style = props.style
    this.label = props.label
    this.emoji = props.emoji
    this.custom_id = props.customId
    this.disabled = props.disabled
  }
}