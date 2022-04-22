import { Module } from '@nestjs/common';
import { HttpService, HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//modules
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { firstValueFrom } from 'rxjs';

const API_KEY_PROD = 1234;
const API_KEY = [{ name: 'Jose' }];

@Module({
  imports: [HttpModule, ProductsModule, UsersModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'Api_key',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'Api_Json',
      useFactory: async (http: HttpService) => {
        const response = await http.get(
          `https://jsonplaceholder.typicode.com/todos`,
        );
        const tasks = await firstValueFrom(response);
        return tasks.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
