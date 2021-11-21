import User from './User'

export default class IntegrationApplication {
  constructor (
    public id: string,
    public name: string,
    public icon: string | undefined,
    public description: string,
    public summary: string,
    public bot: User,

  ) {
  }
}