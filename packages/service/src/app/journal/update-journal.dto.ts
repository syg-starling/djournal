import { IsBoolean, IsDateString, IsEnum, IsOptional, IsString, ValidateIf } from "class-validator"
import { ApproveStatus, ReviewStatus } from "./journal.enum"
import { Journal } from "./journal.interface"

export class UpdateJournalDto {
  @IsOptional()
  @IsString()
  journalName: string

  @IsOptional()
  @IsString()
  yearPublished: string

  @ValidateIf((o: Journal) => o?.reviewStatus === ReviewStatus.Started)
  @IsDateString()
  reviewClosedAt: string

  @IsOptional()
  @IsEnum(ReviewStatus)
  reviewStatus: ReviewStatus

  @IsOptional()
  @IsEnum(ApproveStatus)
  approveStatus: ApproveStatus

  @IsOptional()
  @IsBoolean()
  isPublished: boolean

  @IsOptional()
  bounty: number
}
