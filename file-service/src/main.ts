import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { config } from './common/config/config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'file',
      protoPath: join(__dirname, "../src/protos", "file.proto"),
      url: `localhost:${config.serverPort}`
    },
  });
  app.listen()
}
bootstrap();
