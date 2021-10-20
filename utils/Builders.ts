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
import EmbedRow from '../src/api/components/embeds/EmbedRow'
import { ButtonStyle, ChannelType, ComponentType } from '../srcold/types'
import Button from '../srcold/api/entities/components/Button'
import Collection from '@discordjs/collection'
import { MessageManager } from '../src/api/entities/MessageManager'
import NewsChannel from '../src/api/entities/NewsChannel'
import VoiceChannel from '../src/api/entities/VoiceChannel'
import { CategoryChannel } from '../src/api/entities/CategoryChannel'

export function createMessageFromPayload (payload) {
  const client = Context.getClient()
  const guild = client.cacheManager.guilds.cache.get(payload.guild_id)
  const channel = guild?.channels.cache.get(payload.channel_id) as TextChannel
  const author = guild?.members.cache.get(payload.author.id)!

  const mentionChannel: Collection<Snowflake, any> = new Collection()
  const channelMentions = payload.content.split(' ')
    .filter((word: string) => word.startsWith('<#'))
    .map((word: string) => {
      return word
        .replace(/<#/g, '')
        .replace(/>/g, '')
    })

  channelMentions.forEach((id: Snowflake) => {
    const channel = guild?.channels.cache.get(id)
    mentionChannel.set(channel!.id, channel)
  })

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
      : null,
    payload.referenced_message
      ? channel.messages.cache.get(payload.referenced_message)
      : null,
    payload.pinned,
    new MentionResolvable(
      payload.mention_everyone,
      payload.mention_roles.map((roleId: Snowflake) => guild?.roles.cache.get(roleId)),
      payload.mentions,
      mentionChannel
    ),
    author,
    guild,
    channel,
    payload.content,
    new MessageAttachment(),
    payload.components.map((component) => {
      return walkComponent(component)

      function walkComponent (component) {
        if (component.type === ComponentType.ACTION_ROW) {
          return new EmbedRow()
            .addComponents(
              component.components.map((component) => (
                walkComponent(component)
              ))
            )
        }

        if (component.type === ComponentType.BUTTON) {
          return new Button({
            style: ButtonStyle[component.style] as unknown as ButtonStyle,
            customId: component.custom_id,
            label: component.label || null,
            emoji: component.emoji?.name || null,
            disabled: component.disabled || false
          })
        }
      }
    }),
    payload.embeds.map((embed) => {
      const messageEmbed = new MessageEmbed()
      messageEmbed.title = embed.title
      messageEmbed.description = embed.description
      messageEmbed.author = new EmbedAuthor(embed.author.name, embed.author.url)
      messageEmbed.fields = embed.fields.map((field) => ({
        name: field.title,
        value: field.value,
        inline: field.inline
      }))
      messageEmbed.timestamp = DateTime.fromISO(embed.timestamp)
      messageEmbed.color = embed.color
      messageEmbed.url = embed.url
      messageEmbed.image = new EmbedImage(payload.url, payload.proxy_url)
      messageEmbed.thumbnail = new EmbedThumbnail(payload.url, payload.proxy_url)
      messageEmbed.footer = new EmbedFooter(payload.text, payload.icon_url, payload.proxy_image)
      return messageEmbed
    })
  )
}

export function createChannelFromPayload (payload) {
  let channel: any
  if (payload.type === ChannelType.GUILD_TEXT) {
    channel = new TextChannel(
      payload.id,
      payload.name,
      payload.guild_id,
      undefined as any,
      payload.last_message_id,
      payload.parent_id,
      payload.permission_overwrites,
      payload.position,
      payload.rate_limit_per_user,
      payload.topic,
      new MessageManager(),
      undefined
    )
  }

  if (payload.type === ChannelType.GUILD_NEWS) {
    channel = new NewsChannel(
      payload.id,
      payload.name,
      payload.guild_id,
      undefined as any,
      payload.last_message_id,
      payload.parent_id,
      payload.permission_overwrites,
      payload.position,
      payload.rate_limit_per_user,
      payload.topic,
      new MessageManager()
    )
  }

  if (payload.type === ChannelType.GUILD_VOICE) {
    channel = new VoiceChannel(
      payload.id,
      payload.name,
      payload.user_limit,
      payload.rtc_region,
      payload.rate_limit_per_user,
      payload.position,
      payload.permission_overwrites,
      payload.parent_id,
      payload.bitrate,
      undefined,
    )
  }

  if (payload.type === ChannelType.GUILD_CATEGORY) {
    channel = new CategoryChannel(
      payload.id,
      payload.name,
    )
  }

  return channel
}