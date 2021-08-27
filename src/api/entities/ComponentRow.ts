import { ComponentType } from '../../types'

export default class ComponentRow {
  public type: ComponentType = ComponentType.ACTION_ROW
  public components: any[] = new Proxy([], {
    set: function(target, property, value, receiver) {
      if (target.length > 5) {
        throw new Error(`A row can contain a maximum of 5 components, ${target.length} given.`)
      }
      target[property] = value;
      // you have to return true to accept the changes
      return true;
    }
  })

  public addComponent (component: any) {
    this.components.push(component)
    return this
  }
}