export default function Packet (packetType: string): (target: Function) => { new() } {
  return (target: Function) => {
    return class Packet extends target.prototype.constructor {
      public packetType: string = packetType
    }
  }
}