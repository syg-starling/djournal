import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { JournalController } from './journal.controller'
import { JournalService } from './journal.service'
import { Journal } from './journal.entity'
import { JournalReviewService } from '../journal-review/journal-review.service'
import { JournalReview } from '../journal-review/journal-review.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Journal, JournalReview])],
  controllers: [JournalController],
  providers: [JournalService, JournalReviewService],
})
export class JournalModule { }
