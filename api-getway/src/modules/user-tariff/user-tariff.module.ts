import { Module } from '@nestjs/common';
import { UserTariffService } from './user-tariff.service';
import { UserTariffController } from './user-tariff.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PARK_PACKAGE, TRANSACTION_PACKAGE, USER_PACKAGE } from 'src/common/const/servers';
import { join } from 'path';
import { config } from 'src/common/config/config';
import { UserService } from '../user/user.service';
import { TariffService } from '../tariff/tariff.service';
import { ShotService } from '../shot/shot.service';
import { ServiceService } from '../service/service.service';
import { TransactionService } from '../transaction/transaction.service';
import { ParkService } from '../park/park.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USER_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: ['userTariff', 'user'],
          protoPath: [
            join(__dirname, '..', '..', '..', 'src', 'protos', 'user-tariff.proto'),
            join(__dirname, '..', '..', '..', 'src', 'protos', 'user.proto'),
          ],
          url: `localhost:${config.userPort}`
        },
      },
      {
        name: PARK_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: ['tariff', 'service', 'park'],
          protoPath: [
            join(__dirname, '..', '..', '..', 'src', 'protos', 'tariff.proto'),
            join(__dirname, '..', '..', '..', 'src', 'protos', 'service.proto'),
            join(__dirname, '..', '..', '..', 'src', 'protos', 'park.proto'),
          ],
          url: `localhost:${config.parkPort}`
        },
      },
      {
        name: TRANSACTION_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: ['shot', 'transaction'],
          protoPath: [
            join(__dirname, '..', '..', '..', 'src', 'protos', 'shot.proto'),
            join(__dirname, '..', '..', '..', 'src', 'protos', 'transaction.proto'),
          ],
          url: `localhost:${config.parkPort}`
        },
      }
    ]),
  ],
  controllers: [UserTariffController],
  providers: [
    UserTariffService,
    UserService,
    TariffService,
    ShotService,
    ServiceService,
    TransactionService,
    ParkService
  ],
})
export class UserTariffModule { }
