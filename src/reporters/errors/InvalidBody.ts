import Error from './Error'

export default class InvalidBody extends Error {
  constructor () {
    super('error', 'Invalid body')
    process.exit(1)
  }
}