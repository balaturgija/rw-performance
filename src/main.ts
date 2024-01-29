import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { RequestBodyValidationPipe } from './common/pipes/request-body.validation.pipe';
import { RequestQueryValidationPipe } from './common/pipes/request-query.validation.pipe';
import { CommonExceptionFilter } from './common/filters/common-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  const config = new DocumentBuilder()
    .setTitle('RW performance API')
    .setVersion('1');

  const tags = ['pokemons'];
  for (const tag of tags) {
    config.addTag(tag);
  }

  const document = SwaggerModule.createDocument(app, config.build());

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  app.useGlobalPipes(
    new RequestBodyValidationPipe(),
    new RequestQueryValidationPipe(),
  );
  app.useGlobalFilters(new CommonExceptionFilter());

  await app.listen(process.env.API_PORT);
}
bootstrap();
