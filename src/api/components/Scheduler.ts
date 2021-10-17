export default class Scheduler {
  private scheduler: any
  public ended: boolean = false

  constructor (private value: number) {
  }

  public interval (callback: () => void) {
    this.scheduler = setInterval(() => {
      callback()
    }, this.value)
  }

  public timeout (callback: () => void) {
    this.scheduler = setTimeout(() => {
      callback()
      this.shutdown()
    }, this.value)
  }

  public shutdown () {
    clearInterval(this.scheduler)
  }
}