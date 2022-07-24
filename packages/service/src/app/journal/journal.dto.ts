import { IsNotEmpty, IsString, IsUUID } from "class-validator"

export class CreateJournalDto {
  fileName: string

  data: Uint8Array

  @IsNotEmpty()
  @IsUUID()
  @IsString()
  authorId: string
}
