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
    API: Joi.string().required(),
    POSTGRES_DB: Joi.string().required(),
    POSTGRES_HOST: Joi.string().required(),
    POSTGRES_USER: Joi.string().required(),
    POSTGRES_PASSWORD: Joi.string().required(),
    POSTGRES_PORT: Joi.number().required(),
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
