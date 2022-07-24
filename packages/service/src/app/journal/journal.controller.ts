import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  NotFoundException,
  ParseUUIDPipe,
  UseInterceptors,
  UploadedFile,
  Put,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { CreateJournalDto } from './create-journal.dto'
import { JournalService } from './journal.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { JournalReviewService } from '../journal-review/journal-review.service'
import { Journal } from './journal.interface'
import { UpdateJournalDto } from './update-journal.dto'

@ApiTags('journals')
@Controller('/journals')
export class JournalController {
  constructor(
    private readonly journalService: JournalService,
    private readonly journalReviewService: JournalReviewService,
  ) { }

  @Get('/:id')
  public async getJournal(@Param('id', ParseUUIDPipe) id: string): Promise<Journal | null> {
    if (!id) {
      return null
    }
    const journal = await this.journalService.getJournal(id)
    if (!journal) {
      throw new NotFoundException()
    }
    const reviews = await this.journalReviewService.getAll({ journalId: id })
    return { ...journal, reviews }
  }

  @Get('/')
  public async getJournals(): Promise<Journal[]> {
    const journals = await this.journalService.getJournals()
    return journals
  }

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  public async createJournal(@UploadedFile() file: any, @Body() createJournalDto: CreateJournalDto): Promise<Journal> {
    const journal = await this.journalService.createJournal({ fileName: file.originalname, data: file.buffer, ...createJournalDto })
    return journal
  }

  @Put('/:id')
  public async updateJournalReview(@Param('id') id: string, @Body() updates: UpdateJournalDto): Promise<Journal> {
    return this.journalService.update(id, updates)
  }
}
