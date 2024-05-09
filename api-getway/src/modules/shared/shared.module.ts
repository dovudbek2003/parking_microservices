import { Module } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USER_PACKAGE } from 'src/common/const/servers';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'src/common/config/config';
import { JwtStrategy } from './strategies/jwt.strategy';

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
          }
        ]),
        JwtModule.register({
          global: true,
          secret: config.jwtSecretKey,
          signOptions: { expiresIn: config.jwtExpiresIn },
        }),
      ],
    providers: [UserService, JwtStrategy],
    exports: [UserService, JwtStrategy]
})
export class SharedModule { }
