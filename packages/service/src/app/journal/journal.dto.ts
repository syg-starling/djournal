import { IsNotEmpty, IsString } from 'class-validator'

export class CreateJournalDto {
  @IsNotEmpty()
  @IsString()
  fileName: string

  @IsNotEmpty()
  @IsString()
  data: Uint8Array
}
