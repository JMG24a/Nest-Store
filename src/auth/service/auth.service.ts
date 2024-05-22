import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
// my dependencies
import { PayloadToken } from '../models/token.model';
import { Users as usersEntity } from 'src/users/entity/user.entity';
import { UsersService } from 'src/users/service/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ){}

  async login(email: string, password: string){
    const user = await this.userService.findByEmail(email);
    if(user){
      const isMatch = await bcrypt.compare(password, user.password);
      return isMatch ? user : null;
    }
    return null;
  }

  generateJwt(user: usersEntity){
    const payload: PayloadToken = {
      role: user.role,
      sub: user.id
    }
    return {
      access_token: this.jwtService.sign(payload),
      user
    }
  }
}
