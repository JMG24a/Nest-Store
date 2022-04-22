import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParseInt implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const val = Number(value); //or parseInt (value, 10)
    if (isNaN(val)) {
      throw new BadRequestException(`${value} is not an number`);
    }
    return val;
  }
}
