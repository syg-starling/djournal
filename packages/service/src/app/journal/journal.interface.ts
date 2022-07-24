import { Expose, Type } from 'class-transformer'
import { JournalReview } from '../journal-review/journal-review.entity'
import { User } from '../user/user.interface'

export class Journal {
  @Expose()
  fileName: string

  @Expose()
  @Type(() => User)
  author: User

  @Expose()
  journalName: string

  @Expose()
  yearPublished: string

  @Expose()
  @Type(() => JournalReview)
  reviews?: JournalReview[]

  @Expose()
  data: Uint8Array

  @Expose()
  reviewClosedAt: string

  @Expose()
  reviewStarted: boolean
}
