import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'User name' })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  readonly phon: string;

  @IsString()
  @IsOptional()
  readonly address: string;
}

export class UpdateDTO extends PartialType(CreateDTO) {}


