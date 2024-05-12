/*---------------------------- config ENV  -------------------------------------------*/
import { registerAs } from '@nestjs/config';

export const configAs = registerAs('config', () => {
  // export default
  return {
    database: {
      name: process.env.DATA_BASE_NAME,
      port: process.env.DATA_BASE_PORT,
    },
    apiKey: process.env.API_KEY,
    api: process.env.API,
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
