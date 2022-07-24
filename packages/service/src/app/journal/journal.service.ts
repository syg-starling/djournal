import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Journal } from './journal.entity'
import { CreateJournalDto } from './journal.dto'
import { User } from '../user/user.entity'

@Injectable()
export class JournalService {
  constructor(@InjectRepository(Journal) private journalRepo: Repository<Journal>) { }

  public async createJournal(createJournalDto: CreateJournalDto): Promise<Journal> {
    const journal = this.journalRepo.create(createJournalDto)
    return await this.journalRepo.save(journal)
  }

  public async getJournal(id: string): Promise<Journal | null> {
    return await this.journalRepo.createQueryBuilder('j')
      .leftJoinAndSelect(User, "user", "j.authorId = user.id")
      .where('j.id = :id', { id })
      .getOne()
  }

  public async getJournals(): Promise<Journal[]> {
    return await this.journalRepo.createQueryBuilder('j')
      .leftJoinAndSelect(User, "user", "j.authorId = user.id")
      .getMany()
  }
}
