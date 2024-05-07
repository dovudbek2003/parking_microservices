import { Module } from '@nestjs/common';
import { LayerService } from './layer.service';
import { LayerController } from './layer.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PARK_PACKAGE } from 'src/common/const/servers';
import { join } from 'path';
import { config } from 'src/common/config/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PARK_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: 'layer',
          protoPath: join(__dirname, '..', '..', '..', 'src', 'protos', 'layer.proto'),
          url: `localhost:${config.parkPort}`
        },
      },
    ]),
  ],
  controllers: [LayerController],
  providers: [LayerService],
})
export class LayerModule {}
