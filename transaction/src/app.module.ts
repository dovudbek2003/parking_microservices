import { Module } from '@nestjs/common';
import { ShotModule } from './modules/shot/shot.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './common/config/database';
import { TransactionModule } from './modules/transaction/transaction.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    ShotModule,
    TransactionModule
  ],
})
export class AppModule { }
