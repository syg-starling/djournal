import { IsNotEmpty, IsString } from 'class-validator'

export class SignDto {
  @IsNotEmpty()
  @IsString()
  id: string
  
  @IsString()
  nonce?: string

  @IsString()
  signature?: string

  @IsString()
  refresh?: string
}
