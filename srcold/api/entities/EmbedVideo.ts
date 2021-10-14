export default class EmbedVideo {
  constructor (
    public url: string | null | undefined,
    public proxy_url: string | null | undefined,
    public height: number | null | undefined,
    public width: number | null | undefined,
  ) {
  }
}