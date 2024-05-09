import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './common/config/database';
import { UserModule } from './modules/user/user.module';
import { UserDetailModule } from './modules/user-detail/user-detail.module';
import { UserTariffModule } from './modules/user-tariff/user-tariff.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), UserModule, UserDetailModule, UserTariffModule],
})
export class AppModule { }
