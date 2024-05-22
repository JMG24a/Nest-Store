import { JwtModule } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
// my dependencies
import { configAs } from 'src/environments.config';

const configJwt = (configService: ConfigType<typeof configAs>): JwtModule => {
  return {
    global: true,
    secret: configService.keyJwt,
    signOptions: { expiresIn: '60s' },
  }
}

export const jwtModule = JwtModule.registerAsync({
  useFactory: configJwt,
  inject: [configAs.KEY]
});
