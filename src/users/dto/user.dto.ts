import { PartialType, ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  Length,
  IsOptional,
  IsPositive,
  IsString
} from 'class-validator';

export class CreateDTO {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @ApiProperty({ description: 'the email of user' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  @ApiProperty()
  readonly password: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly role: string;

  @IsOptional()
  @IsPositive()
  @ApiProperty()
  readonly customerId: number;
}

export class UpdateDTO extends PartialType(CreateDTO) {}
