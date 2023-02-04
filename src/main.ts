import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './common/services';
import { enableSwagger } from './swagger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  enableSwagger(app);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(4000);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
}
bootstrap();
