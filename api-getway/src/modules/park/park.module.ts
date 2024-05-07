import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices'
import { ParkService } from './park.service';
import { ParkController } from './park.controller';
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
          package: 'park',
          protoPath: join(__dirname, '..', '..', '..', 'src', 'protos', 'park.proto'),
          url: `localhost:${config.parkPort}`
        },
      },
    ]),
  ],
  controllers: [ParkController],
  providers: [ParkService],
})
export class ParkModule { }
