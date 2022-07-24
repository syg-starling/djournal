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
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { CreateJournalDto } from './journal.dto'
import { JournalService } from './journal.service'
import { Journal } from './journal.entity'
import { FileInterceptor } from '@nestjs/platform-express'

@ApiTags('journals')
@Controller('/journals')
export class JournalController {
  constructor(private readonly journalService: JournalService) { }

  @Get('/')
  public async getJournals(): Promise<Journal[]> {
    const journals = await this.journalService.getJournals()
    return journals
  }

  @Get('/:id')
  public async getJournal(@Param('id', ParseUUIDPipe) id: string): Promise<Journal> {
    const journal = await this.journalService.getJournal(id)
    if (!journal) {
      throw new NotFoundException()
    }
    return journal
  }

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  public async createJournal(@UploadedFile() file: any, @Body() createJournalDto: CreateJournalDto): Promise<Journal> {
    const journal = await this.journalService.createJournal({ fileName: file.originalname, data: file.buffer, ...createJournalDto })
    return journal
  }
}
