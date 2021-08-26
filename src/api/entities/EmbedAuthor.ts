export default class EmbedAuthor {
  constructor (
    public name: string | undefined,
    public url: string | undefined | null,
    public icon_url: string | undefined | null,
    public proxy_url_icon: string | undefined | null
  ) {
  }
}