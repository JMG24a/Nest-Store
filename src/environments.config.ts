/*---------------------------- config ENV  -------------------------------------------*/
import { ConfigModule, registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const environments = {
  dev: '.env',
  prod: '.prod.env',
  stag: '.stag.env',
};

export const configAs = registerAs('config', () => {
  return {
    keyJwt: process.env.KEY,
    api: process.env.API,
    dataBasePg: {
      db: process.env.POSTGRES_DB,
      host: process.env.POSTGRES_HOST,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      port: parseInt(process.env.POSTGRES_PORT, 10),
    },
    typeorm: {
      host: process.env.TYPEORM_HOST,
      type: process.env.TYPEORM_TYPE,
      port: parseInt(process.env.TYPEORM_PORT, 10),
      user: process.env.TYPEORM_USER,
      password: process.env.TYPEORM_PASSWORD,
      db: process.env.TYPEORM_DATABASE_NAME,
      entity: process.env.TYPEORM_ENTITY,
      migrations: process.env.TYPEORM_MIGRATIONS,
      dir: process.env.TYPEORM_MIGRATIONS_DIR,
      table: process.env.TYPEORM_MIGRATIONS_TABLE,
    },
  };
});

export const configModule = ConfigModule.forRoot({
  envFilePath: environments[process.env.NODE_ENV] || '.env',
  load: [configAs],
  isGlobal: true,
  validationSchema: Joi.object({
    // COMMONS envs
    KEY: Joi.string().required(),
    API: Joi.string().required(),
    // POSTGRES envs
    POSTGRES_DB: Joi.string().required(),
    POSTGRES_HOST: Joi.string().required(),
    POSTGRES_USER: Joi.string().required(),
    POSTGRES_PASSWORD: Joi.string().required(),
    POSTGRES_PORT: Joi.number().required(),
    // TYPEORM envs
    TYPEORM_HOST: Joi.string().required(),
    TYPEORM_TYPE: Joi.string().required(),
    TYPEORM_PORT: Joi.string().required(),
    TYPEORM_USER: Joi.string().required(),
    TYPEORM_PASSWORD: Joi.string().required(),
    TYPEORM_DATABASE_NAME: Joi.string().required(),
    TYPEORM_ENTITY: Joi.string().required(),
    TYPEORM_MIGRATIONS: Joi.string().required(),
    TYPEORM_MIGRATIONS_DIR: Joi.string().required(),
    TYPEORM_MIGRATIONS_TABLE: Joi.string().required(),
  }),
});

