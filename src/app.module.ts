import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
// my dependencies
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { DataBaseModule } from './database/database.module';
import { environments, configAs } from './environments.config';

const configModule = ConfigModule.forRoot({
  envFilePath: environments[process.env.NODE_ENV] || '.env',
  load: [configAs],
  isGlobal: true,
  validationSchema: Joi.object({
    API_KEY: Joi.number().required(),
    DATA_BASE_NAME: Joi.string().required(),
    DATA_BASE_PORT: Joi.number().required(),
    API: Joi.string().required(),
  }),
});

@Module({
  imports: [
    configModule,
    ProductsModule,
    UsersModule,
    DataBaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: []
})
export class AppModule {}
