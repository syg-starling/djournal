import { IsNotEmpty, IsString } from 'class-validator'

export class CreateJournalDto {
  fileName: string

  data: Uint8Array

  @IsNotEmpty()
  @IsString()
  address: string
}
