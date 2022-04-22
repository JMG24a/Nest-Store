import { Module, Global } from '@nestjs/common';

const API_KEY_PROD = 1234;
const API_KEY = [{ name: 'Jose' }];

@Global()
@Module({
  providers: [
    {
      provide: 'Api_key',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
  ],
  exports: ['Api_key'],
})
export class DatabaseModule {}
