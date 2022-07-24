import { IsBoolean, IsDateString, IsOptional, IsString, ValidateIf } from "class-validator"
import { Journal } from "./journal.interface"

export class UpdateJournalDto {
  @IsOptional()
  @IsString()
  journalName: string

  @IsOptional()
  @IsString()
  yearPublished: string

  @ValidateIf((o: Journal) => o?.reviewStarted)
  @IsDateString()
  reviewClosedAt: string

  @IsOptional()
  @IsBoolean()
  reviewStarted: boolean

  @IsOptional()
  bounty: number
}
