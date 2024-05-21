import { Module, Global } from '@nestjs/common';
// my dependencies
import { typeOrmModule } from './postgres.config';

@Global()
@Module({
  imports: [typeOrmModule],
  controllers: [],
  providers: [],
  exports: [typeOrmModule],
})
export class DataBaseModule {}
