import { ComponentType } from '../../types'
import Logger from '@leadcodedev/logger'

export default class ComponentRow {
  public type: ComponentType = ComponentType.ACTION_ROW
  public components: any[] = new Proxy([], {
    set: function(target: any[], property, value) {
      if (target.length > 5) {
        Logger.send('error', `A row can contain a maximum of 5 components, ${target.length}.`)
        process.exit()
      }
      target[property] = value;
      return true
    }
  })

  public addComponent (component: any) {
    this.components.push(component)
    return this
  }
}