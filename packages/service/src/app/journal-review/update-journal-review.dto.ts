import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateJournalReviewDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsOptional()
  @IsNumber()
  rating?: number;

  @IsOptional()
  @IsString()
  remarks?: string;
}