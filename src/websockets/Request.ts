import { Opcode } from '../types'
import { Buffer } from 'buffer'

export default class Request<P> {
  constructor (private opcode: Opcode, private payload: P) {
  }

  public setSessionId (sessionId: string) {
    this.payload = {
      ...this.payload,
      session_id: sessionId,
    }
    return this
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