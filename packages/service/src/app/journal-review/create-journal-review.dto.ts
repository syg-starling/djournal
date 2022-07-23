import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateJournalReviewDto {
  @IsNotEmpty()
  @IsUUID()
  journalId: string;

  @IsNotEmpty()
  @IsUUID()
  reviewerId: string;

  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @IsOptional()
  @IsString()
  remarks?: string;
}