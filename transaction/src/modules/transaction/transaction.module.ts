import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './entities/transaction.entity';
import { TransactionRepository } from './transaction.repository';
import { ShotModule } from '../shot/shot.module';
import { Shot } from '../shot/entities/shot.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionEntity, Shot]),
    ShotModule
  ],
  controllers: [TransactionController],
  providers: [
    { provide: 'ITransactionService', useClass: TransactionService },
    { provide: 'ITransactionRepository', useClass: TransactionRepository }
  ],
})
export class TransactionModule { }
