import EmbedField from './EmbedField'

export default interface Embed {
  title?: string
  description?: string
  color?: string
  fields?: EmbedField[]
}