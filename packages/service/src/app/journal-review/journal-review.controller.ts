import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { UpdateJournalReviewDto } from "./update-journal-review.dto";
import { JournalReview } from "./journal-review.entity";
import { JournalReviewService } from "./journal-review.service";
import { CreateJournalReviewDto } from "./create-journal-review.dto";

@Controller('/journal-reviews')
export class JournalReviewController {
  constructor(private readonly journalReviewService: JournalReviewService) { }

  @Get('/')
  public async getJournalReviews(@Query() where: Partial<JournalReview>): Promise<JournalReview[]> {
    return this.journalReviewService.getAll(where)
  }

  @Get('/:id')
  public async getJournalReviewById(@Param('id') id: string): Promise<JournalReview> {
    return this.journalReviewService.getReviewById(id)
  }

  @Post('/')
  public async createJournalReview(@Body() payload: CreateJournalReviewDto): Promise<JournalReview> {
    return this.journalReviewService.createReview(payload)
  }

  @Put('/:id')
  public async updateJournalReview(@Param('id') id: string, @Body() updates: UpdateJournalReviewDto): Promise<JournalReview> {
    return this.journalReviewService.update(id, updates)
  }

  @Delete('/:id')
  public async remove(@Param('id') id: string): Promise<JournalReview> {
    return this.journalReviewService.softRemove(id)
  }
}
