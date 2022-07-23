import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Journal } from './journal.entity'
import { CreateJournalDto } from './journal.dto'

@Injectable()
export class JournalService {
  constructor(@InjectRepository(Journal) private journalRepo: Repository<Journal>) { }

  public async createJournal(createJournalDto: CreateJournalDto): Promise<Journal> {
    const journal = this.journalRepo.create(createJournalDto)
    return await this.journalRepo.save(journal)
  }

  public async getJournal(id: string): Promise<Journal | null> {
    return await this.journalRepo.findOneBy({ id })
  }

  public async getJournals(): Promise<Journal[]> {
    return await this.journalRepo.find()
  }
}
