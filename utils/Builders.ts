import Message from '../src/api/entities/Message'
import { DateTime } from 'luxon'
import { MentionResolvable } from '../src/api/entities/MentionResolvable'
import { Snowflake } from '../src/types'
import MessageAttachment from '../src/api/entities/MessageAttachment'
import TextChannel from '../src/api/entities/TextChannel'
import Context from '../src/Context'
import MessageEmbed from '../srcold/api/entities/MessageEmbed'
import EmbedImage from '../srcold/api/entities/EmbedImage'
import EmbedThumbnail from '../srcold/api/entities/EmbedThumbnail'
import EmbedFooter from '../srcold/api/entities/EmbedFooter'
import EmbedAuthor from '../srcold/api/entities/EmbedAuthor'

export function createMessageFromPayload (payload) {
  const client = Context.getClient()
  const guild = client.cacheManager.guilds.cache.get(payload.guild_id)
  const channel = guild?.channels.cache.get(payload.channel_id) as TextChannel
  const author = guild?.members.cache.get(payload.author.id)!

  return new Message(
    payload.id,
    payload.type,
    payload.flags,
    payload.tts,
    payload.timestamp
      ? DateTime.fromISO(payload.timestamp)
      : null,
    payload.edited_timestamp
      ? DateTime.fromISO(payload.edited_timestamp)
      :null,
    payload.referenced_message
      ? channel.messages.cache.get(payload.referenced_message)
      : null,
    payload.pinned,
    new MentionResolvable(
      payload.mention_everyone,
      payload.mention_roles.map((roleId: Snowflake) => guild?.roles.cache.get(roleId)),
      payload.mentions,
    ),
    author,
    guild,
    channel,
    payload.content,
    new MessageAttachment(),
    payload.components,
    payload.embeds.map((embed) => {
      const messageEmbed = new MessageEmbed()
      messageEmbed.title = embed.title
      messageEmbed.description = embed.description
      messageEmbed.author = new EmbedAuthor(embed.author.name, embed.author.url)
      messageEmbed.fields = embed.fields.map((field) => ({ name: field.title, value: field.value, inline: field.inline }))
      messageEmbed.timestamp =  DateTime.fromISO(embed.timestamp)
      messageEmbed.color = embed.color
      messageEmbed.url = embed.url
      messageEmbed.image = new EmbedImage(payload.url, payload.proxy_url)
      messageEmbed.thumbnail = new EmbedThumbnail(payload.url, payload.proxy_url)
      messageEmbed.footer = new EmbedFooter(payload.text, payload.icon_url, payload.proxy_image)
      return messageEmbed
    }),
  )
}