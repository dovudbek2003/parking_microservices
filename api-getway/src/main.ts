import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from './common/config/config';
import { AllExceptionsFilter } from './lib/all-exception-filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  app.useBodyParser('json');
  app.setGlobalPrefix('api');

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const options = new DocumentBuilder()
  .setTitle('Parking Microservice')
  .setDescription('this is v1')
  .setVersion('1.0.0')
  .addTag('Your API Tag ok')
  .addBearerAuth()
  .build();

const document = SwaggerModule.createDocument(app, options);
SwaggerModule.setup('docs', app, document);

await app.listen(config.serverPort, () => {
  console.log(`http://localhost:${config.serverPort}`);
  console.log(`http://localhost:${config.serverPort}/docs`);
});
}
bootstrap();
