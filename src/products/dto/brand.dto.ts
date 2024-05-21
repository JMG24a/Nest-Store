import {
  IsString,
  IsUrl,
  IsNotEmpty,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class createDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
}

export class updateDTO extends PartialType(createDTO) {}
