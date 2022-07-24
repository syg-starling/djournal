import { Expose } from 'class-transformer'

export class User {
  @Expose()
  id: string

  @Expose()
  name?: string
}
