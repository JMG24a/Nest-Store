import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isMongoId } from 'class-validator';

@Injectable()
export class MongoIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const id = isMongoId(value);
    if (!id) {
      throw new HttpException(`invalid id ${value}`, HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}
