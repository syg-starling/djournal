import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { JournalController } from './journal.controller'
import { JournalService } from './journal.service'
import { Journal } from './journal.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Journal])],
  controllers: [JournalController],
  providers: [JournalService],
})
export class JournalModule { }
