import { Module } from '@nestjs/common';
import { ShotService } from './shot.service';
import { ShotController } from './shot.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TRANSACTION_PACKAGE, USER_PACKAGE } from 'src/common/const/servers';
import { join } from 'path';
import { config } from 'src/common/config/config';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: TRANSACTION_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: 'shot',
          protoPath: join(__dirname, '..', '..', '..', 'src', 'protos', 'shot.proto'),
          url: `localhost:${config.shotPort}`
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
      }
    ]),
  ],
  controllers: [ShotController],
  providers: [ShotService, UserService],
})
export class ShotModule { }
