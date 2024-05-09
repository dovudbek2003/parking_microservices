import { Module } from '@nestjs/common';
import { LayerService } from './layer.service';
import { LayerController } from './layer.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PARK_PACKAGE, USER_PACKAGE } from 'src/common/const/servers';
import { join } from 'path';
import { config } from 'src/common/config/config';
import { ParkService } from '../park/park.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PARK_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: ['layer', 'park'],
          protoPath: [
            join(__dirname, '..', '..', '..', 'src', 'protos', 'layer.proto'),
            join(__dirname, '..', '..', '..', 'src', 'protos', 'park.proto'),
          ],
          url: `localhost:${config.parkPort}`
        },
      },
    ]),
  ],
  controllers: [LayerController],
  providers: [LayerService, ParkService],
})
export class LayerModule { }
