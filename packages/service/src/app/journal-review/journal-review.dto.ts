import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { BaseEntity } from "~/../common/dist";

export class JournalReviewDto extends BaseEntity {
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