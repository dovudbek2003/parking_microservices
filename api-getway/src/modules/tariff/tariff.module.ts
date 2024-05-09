import { Module } from '@nestjs/common';
import { TariffService } from './tariff.service';
import { TariffController } from './tariff.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PARK_PACKAGE } from 'src/common/const/servers';
import { join } from 'path';
import { config } from 'src/common/config/config';
import { ParkService } from '../park/park.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PARK_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: ['tariff', 'park'],
          protoPath: [
            join(__dirname, '..', '..', '..', 'src', 'protos', 'tariff.proto'),
            join(__dirname, '..', '..', '..', 'src', 'protos', 'park.proto'),
          ],
          url: `localhost:${config.parkPort}`
        },
      },
    ]),
  ],
  controllers: [TariffController],
  providers: [TariffService, ParkService],
})
export class TariffModule { }
