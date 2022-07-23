import { Expose } from 'class-transformer'

export class Journal {
  @Expose()
  fileName: string

  @Expose()
  email: string

  password: string
}
