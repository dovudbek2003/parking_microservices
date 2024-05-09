import { Module } from '@nestjs/common';
import { UserDetailService } from './user-detail.service';
import { UserDetailController } from './user-detail.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USER_PACKAGE } from 'src/common/const/servers';
import { join } from 'path';
import { config } from 'src/common/config/config';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USER_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: ['userDetail', 'user'],
          protoPath: [
            join(__dirname, '..', '..', '..', 'src', 'protos', 'user-detail.proto'),
            join(__dirname, '..', '..', '..', 'src', 'protos', 'user.proto'),
          ],
          url: `localhost:${config.userPort}`
        },
      }
    ]),
  ],
  controllers: [UserDetailController],
  providers: [UserDetailService, UserService],
})
export class UserDetailModule { }
