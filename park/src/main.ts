import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './common/config/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: ['park', 'layer', 'place', 'tariff', 'service'],
      protoPath: [
        join(__dirname, "../src/protos", "park.proto"),
        join(__dirname, "../src/protos", "layer.proto"),
        join(__dirname, "../src/protos", "place.proto"),
        join(__dirname, "../src/protos", "tariff.proto"),
        join(__dirname, "../src/protos", "service.proto")
      ],
      url: `localhost:${config.serverPort}`
    },
  });

  await app.listen();
}
bootstrap();
