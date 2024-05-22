import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core'
import { Request } from 'express';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator'
import { configAs } from 'src/environments.config';
import { ConfigType } from '@nestjs/config';

const throwError = (message: string) => {
  throw new UnauthorizedException(message)
}

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(configAs.KEY) private configService: ConfigType<typeof configAs>
  ){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if(isPublic){
      return true;
    }
    const request = context.switchToHttp().getRequest<Request>()
    const auth = request.header('Auth')
    return auth === this.configService.keyJwt ? true : throwError('not allow')
  }
}
