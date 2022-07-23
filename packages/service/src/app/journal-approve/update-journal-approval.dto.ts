import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateJournalApprovalDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsOptional()
  @IsNumber()
  vote?: number;

  @IsOptional()
  @IsString()
  remarks?: string;
}