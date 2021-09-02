import { ArgumentType } from '../../types'

export default class CommandOption {
  public options: any[] = []

  public addArgument (options: { name: string, description: string, type: ArgumentType, options?: CommandOption, required?: boolean }) {
    this.options.push({
      name: options.name,
      description: options.description,
      type: options.type,
      options: options.options
        ? options.options.options
        : [],
      required: options.required || false
    })
    return this
  }
}
