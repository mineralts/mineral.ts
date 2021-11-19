import User from './User'

export default class IntegrationApplication {
  constructor (
    public id: string,
    public name: string,
    public icon: string | null,
    public description: string,
    public summary: string,
    public bot: User | undefined,

  ) {
  }
}