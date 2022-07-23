import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UpdateJournalApprovalDto } from "./update-journal-approval.dto";
import { JournalApproval } from "./journal-approval.entity";
import { JournalApprovalService } from "./journal-approval.service";
import { CreateJournalApprovalDto } from "./create-journal-approval.dto";

@Controller('/journal-approval')
export class JournalApprovalController {
  constructor(private readonly approvalService: JournalApprovalService) { }

  @Get('/')
  public async getJournalApprovals(): Promise<JournalApproval[]> {
    return this.approvalService.getAll()
  }

  @Get('/:id')
  public async getJournalApprovalById(@Param('id') id: string): Promise<JournalApproval> {
    return this.approvalService.getApprovalById(id)
  }

  @Post('/')
  public async createJournalApproval(@Body() payload: CreateJournalApprovalDto): Promise<JournalApproval> {
    return this.approvalService.create(payload)
  }

  @Put('/:id')
  public async updateJournalApproval(@Param('id') id: string, @Body() updates: UpdateJournalApprovalDto): Promise<JournalApproval> {
    return this.approvalService.update(id, updates)
  }

  @Delete('/:id')
  public async remove(@Param('id') id: string): Promise<JournalApproval> {
    return this.approvalService.softRemove(id)
  }
}
