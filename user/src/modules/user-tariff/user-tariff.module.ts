import { Module } from '@nestjs/common';
import { UserTariffService } from './user-tariff.service';
import { UserTariffController } from './user-tariff.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTariff } from './entities/user-tariff.entity';
import { UserModule } from '../user/user.module';
import { UserTariffRepository } from './user-tariff.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserTariff]),
    UserModule
  ],
  controllers: [UserTariffController],
  providers: [
    { provide: 'IUserTariffService', useClass: UserTariffService },
    { provide: 'IUserTariffRepository', useClass: UserTariffRepository }
  ],
})
export class UserTariffModule { }
