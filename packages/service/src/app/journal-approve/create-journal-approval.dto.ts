import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateJournalApprovalDto {
  @IsNotEmpty()
  @IsUUID()
  journalId: string;

  @IsNotEmpty()
  @IsUUID()
  approverId: string;

  @IsNotEmpty()
  @IsNumber()
  vote: number;

  @IsOptional()
  @IsString()
  remarks?: string;
}