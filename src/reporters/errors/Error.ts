import Logger from '@leadcodedev/logger'

type Type = 'info' | 'success' | 'warn' | 'error' | 'default'

export default class Error {
  constructor (public type: Type, public message: string) {
    Logger.send(type, message)
  }
}