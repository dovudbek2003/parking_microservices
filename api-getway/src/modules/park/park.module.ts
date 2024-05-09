import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices'
import { ParkService } from './park.service';
import { ParkController } from './park.controller';
import { PARK_PACKAGE, USER_PACKAGE } from 'src/common/const/servers';
import { join } from 'path';
import { config } from 'src/common/config/config';
import { JwtStrategy } from '../shared/strategies/jwt.strategy';
import { SharedModule } from '../shared/shared.module';
import { UserService } from '../user/user.service';

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
      {
        name: USER_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: 'user',
          protoPath: join(__dirname, '..', '..', '..', 'src', 'protos', 'user.proto'),
          url: `localhost:${config.userPort}`
        },
      },
    ]),
    // SharedModule
  ],
  controllers: [ParkController],
  providers: [ParkService, UserService, JwtStrategy],
})
export class ParkModule { }
