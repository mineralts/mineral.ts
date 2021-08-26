import Collection from '@discordjs/collection'

export default class Global {
  private static $instance: Global
  public sharedItems: Collection<string, any> = new Collection()

  public static getSharedItem () {
    if (!this.$instance) {
      this.$instance = new Global()
    }
    return this.$instance.sharedItems
  }
}