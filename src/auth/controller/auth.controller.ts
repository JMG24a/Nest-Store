import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from '../service/auth.service';
import { Users as UsersEntity } from 'src/users/entity/user.entity';

@Controller('auth')
export class AuthController {
  constructor( private authService: AuthService ){}

  @Post()
  @UseGuards(AuthGuard('local'))
  async login(@Req() request: Request){
    const user = request.user as UsersEntity;
    const token = await this.authService.generateJwt(user);
    return {
      ...token
    };
  }
}
