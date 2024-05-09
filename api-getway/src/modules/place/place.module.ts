import { Module } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceController } from './place.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PARK_PACKAGE } from 'src/common/const/servers';
import { join } from 'path';
import { config } from 'src/common/config/config';
import { LayerService } from '../layer/layer.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PARK_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: ['place', 'layer'],
          protoPath: [
            join(__dirname, '..', '..', '..', 'src', 'protos', 'place.proto'),
            join(__dirname, '..', '..', '..', 'src', 'protos', 'layer.proto'),
          ],
          url: `localhost:${config.parkPort}`
        },
      },
    ]),
  ],
  controllers: [PlaceController],
  providers: [PlaceService, LayerService],
})
export class PlaceModule {}
