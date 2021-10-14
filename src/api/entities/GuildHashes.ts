type Hash = {
  omitted: boolean,
  hash: string
}

export default class GuildHashes {
  constructor (
    public roles: Hash,
    public metadata: Hash,
    public channels: Hash,
  ) {
  }
}