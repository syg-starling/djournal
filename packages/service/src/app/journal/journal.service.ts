import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Journal } from './journal.interface'
import { CreateJournalDto } from './create-journal.dto'
import { User } from '../user/user.entity'
import { UpdateJournalDto } from './update-journal.dto'

@Injectable()
export class JournalService {
  constructor(@InjectRepository(Journal) private journalRepo: Repository<Journal>) { }

  public async createJournal(createJournalDto: CreateJournalDto): Promise<Journal> {
    const journal = this.journalRepo.create(createJournalDto)
    return await this.journalRepo.save(journal)
  }

  public async getJournal(id: string): Promise<Journal | null> {
    if (!id) {
      return null
    }
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

  public async update(id: string, updates: UpdateJournalDto): Promise<Journal> {
    if (!id) {
      throw new BadRequestException('Invalid id')
    }
    const journal = await this.getJournal(id)
    if (!journal) {
      throw new NotFoundException('Journal not found')
    }
    return this.journalRepo.save({ ...journal, ...updates })
  }
}
