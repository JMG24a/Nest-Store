import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as Joi from 'joi';
//modules
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { environments } from './environments';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        API: Joi.string().required(),
      }),
    }),
    HttpModule,
    ProductsModule,
    UsersModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// ** example useFactory whit external api
// import { Module } from '@nestjs/common';
// import { firstValueFrom } from 'rxjs';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { HttpService, HttpModule } from '@nestjs/axios';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import * as Joi from 'joi';
// //modules
// import { ProductsModule } from './products/products.module';
// import { UsersModule } from './users/users.module';
// import { DatabaseModule } from './database/database.module';
// import { environments } from './environments';
// import config from './config';

// const configService = new ConfigService();

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       envFilePath: environments[process.env.NODE_ENV] || '.env',
//       load: [config],
//       isGlobal: true,
//       validationSchema: Joi.object({
//         API_KEY: Joi.string().required(),
//         DATABASE_NAME: Joi.string().required(),
//         DATABASE_PORT: Joi.number().required(),
//         API: Joi.string().required(),
//       }),
//     }),
//     HttpModule,
//     ProductsModule,
//     UsersModule,
//     DatabaseModule,
//   ],
//   controllers: [AppController],
//   providers: [
//     AppService,
//     {
//       provide: 'Api_Json',
//       useFactory: async (http: HttpService) => {
//         const response = await http.get(`${configService.get('API')}`);
//         const tasks = await firstValueFrom(response);
//         return tasks.data;
//       },
//       inject: [HttpService],
//     },
//   ],
// })
// export class AppModule {}
