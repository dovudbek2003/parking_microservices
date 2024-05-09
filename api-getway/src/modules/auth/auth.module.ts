import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PARK_PACKAGE, USER_PACKAGE } from 'src/common/const/servers';
import { join } from 'path';
import { config } from 'src/common/config/config';
import { JwtModule } from '@nestjs/jwt';
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
    JwtModule.register({
      global: true,
      secret: config.jwtSecretKey,
      signOptions: { expiresIn: config.jwtExpiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, ParkService],
})
export class AuthModule { }
