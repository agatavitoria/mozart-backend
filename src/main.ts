import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { PrismaService } from 'src/common/services';
import { enableSwagger } from 'src/swagger.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  enableSwagger(app);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(4000);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
}
bootstrap();
