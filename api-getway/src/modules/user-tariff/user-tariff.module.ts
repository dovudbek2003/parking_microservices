import { Module } from '@nestjs/common';
import { UserTariffService } from './user-tariff.service';
import { UserTariffController } from './user-tariff.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PARK_PACKAGE, USER_PACKAGE } from 'src/common/const/servers';
import { join } from 'path';
import { config } from 'src/common/config/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USER_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: 'userTariff',
          protoPath: join(__dirname, '..', '..', '..', 'src', 'protos', 'user-tariff.proto'),
          url: `localhost:${config.userPort}`
        },
      },
      {
        name: PARK_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: 'tariff',
          protoPath: join(__dirname, '..', '..', '..', 'src', 'protos', 'tariff.proto'),
          url: `localhost:${config.parkPort}`
        },
      }
    ]),
  ],
  controllers: [UserTariffController],
  providers: [UserTariffService],
})
export class UserTariffModule {}
