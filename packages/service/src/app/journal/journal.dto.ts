import { IsNotEmpty, IsString, IsUUID } from "class-validator"

export class CreateJournalDto {
  fileName: string

  data: Uint8Array

  @IsNotEmpty()
  @IsString()
  authorId: string

  @IsNotEmpty()
  @IsString()
  journalName: string

  @IsNotEmpty()
  @IsString()
  yearPublished: string
}
