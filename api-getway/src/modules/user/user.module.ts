import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PARK_PACKAGE, USER_PACKAGE } from 'src/common/const/servers';
import { join } from 'path';
import { config } from 'src/common/config/config';
import { ParkService } from '../park/park.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USER_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: 'user',
          protoPath: join(__dirname, '..', '..', '..', 'src', 'protos', 'user.proto'),
          url: `localhost:${config.userPort}`
        },
      },
      {
        name: PARK_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: 'park',
          protoPath: join(__dirname, '..', '..', '..', 'src', 'protos', 'park.proto'),
          url: `localhost:${config.parkPort}`
        },
      }
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, ParkService],
})
export class UserModule { }
