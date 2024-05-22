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
