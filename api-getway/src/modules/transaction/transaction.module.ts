import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
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
          package: 'transaction',
          protoPath: join(__dirname, '..', '..', '..', 'src', 'protos', 'transaction.proto'),
          url: `localhost:${config.shotPort}`
        },
      }
    ]),
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
