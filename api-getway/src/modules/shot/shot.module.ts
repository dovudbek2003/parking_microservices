import { Module } from '@nestjs/common';
import { ShotService } from './shot.service';
import { ShotController } from './shot.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SHOT_PACKAGE } from 'src/common/const/servers';
import { join } from 'path';
import { config } from 'src/common/config/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: SHOT_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: 'shot',
          protoPath: join(__dirname, '..', '..', '..', 'src', 'protos', 'shot.proto'),
          url: `localhost:${config.shotPort}`
        },
      }
    ]),
  ],
  controllers: [ShotController],
  providers: [ShotService],
})
export class ShotModule { }
