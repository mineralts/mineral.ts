import { Opcode } from '../types'
import { Buffer } from 'buffer'

export default class Request<P> {
  constructor (private opcode: Opcode, private payload: P) {
  }

  public build (): Buffer {
    return Buffer.from(
        JSON.stringify({
        op: this.opcode,
        d: this.payload
      })
    )
  }
}