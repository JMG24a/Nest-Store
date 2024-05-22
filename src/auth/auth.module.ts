import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
// my dependencies
import { LocalStrategy } from './strategies/local.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'
import { AuthService } from './service/auth.service';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './controller/auth.controller';
import { jwtModule } from './auth.config.module';

@Module({
  imports: [UsersModule, PassportModule, jwtModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [jwtModule]
})
export class AuthModule {}
