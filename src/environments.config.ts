/*---------------------------- config ENV  -------------------------------------------*/
import { registerAs } from '@nestjs/config';

export const configAs = registerAs('config', () => {
  // export default
  return {
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

export const environments = {
  dev: '.env',
  prod: '.prod.env',
  stag: '.stag.env',
};

/*---------------------------- Documentation -------------------------------------------*/
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const documentation = (app) => {

  const docsConfig = new DocumentBuilder() // documentation setup
  .setTitle('Store API Examples')
  .setDescription('This is a store to practice Nest.js')
  .addTag('roots')
  .build();

  const docs = SwaggerModule.createDocument(app, docsConfig);
  SwaggerModule.setup('documentation', app, docs)
}
