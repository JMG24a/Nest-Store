import {
  IsString,
  IsNotEmpty,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class createDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  readonly description: string;
}

export class updateDTO extends PartialType(createDTO) {}
