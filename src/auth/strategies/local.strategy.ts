import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local'
import { AuthService } from '../service/auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    private authService: AuthService,
  ){ super({
      usernameField: 'email',
      passwordField: 'password',
      });
    }

  async validate(email: string, passport: string){
    const user = await this.authService.login(email, passport);
    if(!user){
      throw new UnauthorizedException('not authorized');
    }
    return user;
  }
}