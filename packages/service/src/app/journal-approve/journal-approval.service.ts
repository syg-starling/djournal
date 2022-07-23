import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateJournalApprovalDto } from "./create-journal-approval.dto";
import { JournalApproval } from "./journal-approval.entity";
import { UpdateJournalApprovalDto } from "./update-journal-approval.dto";

@Injectable()
export class JournalApprovalService {
  constructor(
    @InjectRepository(JournalApproval)
    private repo: Repository<JournalApproval>,
  ) { }

  public async create(approvalDto: CreateJournalApprovalDto): Promise<JournalApproval> {
    const review = this.repo.create(approvalDto)
    return this.repo.save(review)
  }

  public async getApprovalById(id: string): Promise<JournalApproval | null> {
    if (!id) {
      return null
    }
    return this.repo.findOneBy({ id })
  }

  public async getAll(): Promise<JournalApproval[]> {
    return this.repo.find()
  }

  public async update(id: string, updates: UpdateJournalApprovalDto): Promise<JournalApproval> {
    if (!id) {
      throw new BadRequestException('Invalid id')
    }
    const review = await this.getApprovalById(id)
    if (!review) {
      throw new NotFoundException('Approval not found')
    }
    return this.repo.save({ ...review, ...updates })
  }

  public async softRemove(id: string): Promise<JournalApproval> {
    if (!id) {
      throw new BadRequestException('Invalid id')
    }
    const review = await this.getApprovalById(id)
    if (!review) {
      throw new NotFoundException('Approval not found')
    }
    review.deletedAt = new Date().toISOString()
    return this.repo.save(review)
  }
}