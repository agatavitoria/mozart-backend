import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const enableSwagger = (app: INestApplication, path = 'api') => {
  const config = new DocumentBuilder()
    .setTitle('API - MozArte')
    .setDescription('This is MozArte API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};
