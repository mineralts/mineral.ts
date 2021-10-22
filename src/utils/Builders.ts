import Message from '../api/entities/Message'
import { DateTime } from 'luxon'
import { MentionResolvable } from '../api/entities/MentionResolvable'
import { Snowflake } from '../types'
import MessageAttachment from '../api/entities/MessageAttachment'
import Context from '../Context'
import EmbedRow from '../api/components/embeds/EmbedRow'
import { ButtonStyle, ChannelTypeResolvable, ComponentType } from '../types'
import Collection from '@discordjs/collection'
import MessageManager from '../api/entities/MessageManager'
import CategoryChannel from '../api/entities/channels/CategoryChannel'
import TextChannel from '../api/entities/channels/TextChannel'
import NewsChannel from '../api/entities/channels/NewsChannel'
import VoiceChannel from '../api/entities/channels/VoiceChannel'
import EmbedImage from '../api/components/embeds/EmbedImage'
import EmbedThumbnail from '../api/components/embeds/EmbedThumbnail'
import EmbedFooter from '../api/components/embeds/EmbedFooter'
import EmbedAuthor from '../api/components/embeds/EmbedAuthor'
import MessageEmbed from '../api/components/embeds/MessageEmbed'
import Button from '../api/components/buttons/Button'
import { keyFromEnum } from './index'

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
            style: keyFromEnum(ButtonStyle, component.style) as Exclude<keyof typeof ButtonStyle, 'LINK'>,
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
      messageEmbed.author = new EmbedAuthor(embed.author.name, embed.author.url, embed.author.icon)
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
  if (payload.type === ChannelTypeResolvable.GUILD_TEXT) {
    channel = new TextChannel(
      payload.id,
      payload.name,
      payload.guild_id,
      undefined as any,
      payload.last_message_id,
      undefined,
      payload.parent_id,
      payload.permission_overwrites,
      payload.position,
      payload.rate_limit_per_user,
      payload.topic,
      new MessageManager(),
      undefined
    )
  }

  if (payload.type === ChannelTypeResolvable.GUILD_NEWS) {
    channel = new NewsChannel(
      payload.id,
      payload.name,
      payload.guild_id,
      undefined as any,
      payload.last_message_id,
      undefined,
      payload.parent_id,
      payload.permission_overwrites,
      payload.position,
      payload.rate_limit_per_user,
      payload.topic,
      new MessageManager()
    )
  }

  if (payload.type === ChannelTypeResolvable.GUILD_VOICE) {
    channel = new VoiceChannel(
      payload.id,
      payload.name,
      payload.guild_id,
      undefined,
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

  if (payload.type === ChannelTypeResolvable.GUILD_CATEGORY) {
    channel = new CategoryChannel(
      payload.id,
      payload.name,
      payload.guild_id,
      undefined
    )
  }

  return channel
}