import {
  // IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsEnum,
} from 'class-validator'
import { Type } from 'class-transformer'

// import { ToBoolean } from './config.decorator'
import { Environment, LogLevel } from './config.enum'

export class ConfigDto {
  @IsNotEmpty()
  @IsString()
  @IsEnum(Environment)
  ENVIRONMENT: Environment

  @IsNotEmpty()
  @IsString()
  @IsEnum(LogLevel)
  LOG_LEVEL: LogLevel

  @IsOptional()
  @IsString()
  CORS_ORIGIN?: string

  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  PORT: number

  @IsOptional()
  @IsString()
  POSTGRES_HOST: string

  @Type(() => Number)
  @IsOptional()
  POSTGRES_PORT: number

  @IsString()
  POSTGRES_USERNAME: string

  @IsString()
  POSTGRES_PASSWORD: string

  @IsString()
  POSTGRES_DATABASE: string

  @IsString()
  RPC_URL: string

  @IsString()
  PRIVATE_KEY: string
}
