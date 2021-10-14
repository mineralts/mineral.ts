export default class Rest {
  private static $instance: Rest
  public readonly cdn: string = 'https://cdn.discordapp.com'

  public static getInstance () {
    if (!this.$instance) {
      return new Rest()
    }
    return this.$instance
  }
}