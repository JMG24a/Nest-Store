import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParseInt implements PipeTransform {
  transform(values: string, metadata: ArgumentMetadata) {
    const val = Number(values); //or parseInt (value, 10)
    if (isNaN(val)) {
      throw new BadRequestException(`${values} is not an number`);
    }
    return val;
  }
}
