import User from './User'
import Guild from './Guild'
import Command from '../components/commands/Command'
import Request from '../../sockets/Request'
import Presence from './Presence'
import Collection from '@discordjs/collection'
import { Snowflake } from '../../types'

export default class ClientUser {
  constructor (
    public readonly user: User,
    public readonly sessionId: string,
    public readonly presences: Presence[],
    public readonly guilds: Guild[],
    public readonly application: { id: string, flags: number },
    public commands: Collection<Snowflake, Command> = new Collection()
  ) {
  }

  public async registerCommands (...commands: Command[]) {
    const request = new Request(`/applications/${this.application.id}`)

    return Promise.all(
      commands.map(async (command: Command) => {
        const payload = await request.post(command)
        command.id = payload.id

        this.commands.set(command.id!, command)
      })
    )
  }
}