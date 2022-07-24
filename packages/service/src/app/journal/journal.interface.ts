import { Expose, Type } from 'class-transformer'
import { User } from '../user/user.interface'

export class Journal {
  @Expose()
  fileName: string

  @Expose()
  email: string

  @Expose()
  @Type(() => User)
  author: User

  @Expose()
  journalName: string

  password: string
}
