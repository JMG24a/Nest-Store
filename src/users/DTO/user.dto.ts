import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class createDTO {
  @IsString()
  @IsNotEmpty()
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
