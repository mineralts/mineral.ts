import { ComponentType, MessageComponentResolvable } from '../../../types'
import Logger from '@leadcodedev/logger'

export default class EmbedRow {
  public type: ComponentType = ComponentType.ACTION_ROW
  public components: MessageComponentResolvable[] = new Proxy([], {
    set: function(target: MessageComponentResolvable[], property: string | symbol, value) {
      if (target.length > 5) {
        Logger.send('error', `A row can contain a maximum of 5 components, ${target.length}.`)
        process.exit()
      }
      target[property] = value;
      return true
    }
  })

  public addComponent (component: MessageComponentResolvable) {
    this.components.push(component)
    return this
  }

  public addComponents (components: MessageComponentResolvable[]) {
    components.forEach((component: MessageComponentResolvable) => {
      this.components.push(component)
    })
    return this
  }
}