import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// my dependencies
import { configAs } from '../environments.config';

const configPG = (configService: ConfigType<typeof configAs>): TypeOrmModule => {
  const { db, host, password, port, user } = configService.dataBasePg;
  return {
    type: 'postgres',
    database: db,
    host,
    username: user,
    password,
    port,
    synchronize: false, //danger
    autoLoadEntities: true
  }
}

export const typeOrmModule = TypeOrmModule.forRootAsync({
  useFactory: configPG,
  inject: [configAs.KEY]
})

