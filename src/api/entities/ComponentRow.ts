import { ComponentType } from '../../types'

export default class ComponentRow {
  public type: ComponentType = ComponentType.ACTION_ROW
  public components: any[] = []

  public addComponent (component: any) {
    this.components.push(component)
    return this
  }
}