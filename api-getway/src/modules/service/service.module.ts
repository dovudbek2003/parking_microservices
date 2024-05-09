import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PARK_PACKAGE, USER_PACKAGE } from 'src/common/const/servers';
import { join } from 'path';
import { config } from 'src/common/config/config';
import { ParkService } from '../park/park.service';
import { TariffService } from '../tariff/tariff.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PARK_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: ['service', 'park', 'tariff'],
          protoPath: [
            join(__dirname, '..', '..', '..', 'src', 'protos', 'service.proto'),
            join(__dirname, '..', '..', '..', 'src', 'protos', 'park.proto'),
            join(__dirname, '..', '..', '..', 'src', 'protos', 'tariff.proto'),
          ],
          url: `localhost:${config.parkPort}`
        },
      },
      {
        name: USER_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: ['user'],
          protoPath: [
            join(__dirname, '..', '..', '..', 'src', 'protos', 'user.proto'),
          ],
          url: `localhost:${config.userPort}`
        },
      },
    ]),
  ],
  controllers: [ServiceController],
  providers: [
    ServiceService,
    ParkService,
    TariffService,
    UserService
  ],
})
export class ServiceModule { }
