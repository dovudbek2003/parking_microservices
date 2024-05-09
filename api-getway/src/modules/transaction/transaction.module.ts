import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PARK_PACKAGE, TRANSACTION_PACKAGE } from 'src/common/const/servers';
import { join } from 'path';
import { config } from 'src/common/config/config';
import { ShotService } from '../shot/shot.service';
import { ServiceService } from '../service/service.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: TRANSACTION_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: ['transaction', 'shot'],
          protoPath: [
            join(__dirname, '..', '..', '..', 'src', 'protos', 'transaction.proto'),
            join(__dirname, '..', '..', '..', 'src', 'protos', 'shot.proto'),
          ],
          url: `localhost:${config.shotPort}`
        },
      },
      {
        name: PARK_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: ['service'],
          protoPath: [
            join(__dirname, '..', '..', '..', 'src', 'protos', 'service.proto'),
          ],
          url: `localhost:${config.serverPort}`
        },
      }
    ]),
  ],
  controllers: [TransactionController],
  providers: [TransactionService, ShotService, ServiceService],
})
export class TransactionModule { }
