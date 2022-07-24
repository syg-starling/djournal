import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateJournalReviewDto } from "./create-journal-review.dto";
import { JournalReview } from "./journal-review.entity";
import { UpdateJournalReviewDto } from "./update-journal-review.dto";

@Injectable()
export class JournalReviewService {
  constructor(
    @InjectRepository(JournalReview)
    private journalReviewRepo: Repository<JournalReview>,
  ) { }

  public async createReview(createReviewDto: CreateJournalReviewDto): Promise<JournalReview> {
    const review = this.journalReviewRepo.create(createReviewDto)
    return this.journalReviewRepo.save(review)
  }

  public async getReviewById(id: string): Promise<JournalReview | null> {
    if (!id) {
      return null
    }
    return this.journalReviewRepo.findOneBy({ id })
  }

  public async getAll(where: Partial<JournalReview>): Promise<JournalReview[]> {
    return this.journalReviewRepo.find({ where })
  }

  public async update(id: string, updates: UpdateJournalReviewDto): Promise<JournalReview> {
    if (!id) {
      throw new BadRequestException('Invalid id')
    }
    const review = await this.getReviewById(id)
    if (!review) {
      throw new NotFoundException('Review not found')
    }
    return this.journalReviewRepo.save({ ...review, ...updates })
  }

  public async softRemove(id: string): Promise<JournalReview> {
    if (!id) {
      throw new BadRequestException('Invalid id')
    }
    const review = await this.getReviewById(id)
    if (!review) {
      throw new NotFoundException('Review not found')
    }
    review.deletedAt = new Date().toISOString()
    return this.journalReviewRepo.save(review)
  }
}