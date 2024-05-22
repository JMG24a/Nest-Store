import { Module } from '@nestjs/common';
// my dependencies
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { DataBaseModule } from './database/database.module';
import { configModule } from './environments.config';
import { AuthService } from './auth/service/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    configModule,
    ProductsModule,
    UsersModule,
    DataBaseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
  exports: []
})
export class AppModule {}
