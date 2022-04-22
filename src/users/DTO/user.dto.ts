import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class createDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'User name' })
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @IsPhoneNumber()
  readonly phon: string;

  @IsString()
  @IsNotEmpty()
  readonly address: string;
}

export class updateDTO extends PartialType(createDTO) {}
