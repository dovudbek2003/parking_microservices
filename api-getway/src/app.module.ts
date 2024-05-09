import { Module } from '@nestjs/common';
import { ParkModule } from './modules/park/park.module';
import { LayerModule } from './modules/layer/layer.module';
import { PlaceModule } from './modules/place/place.module';
import { TariffModule } from './modules/tariff/tariff.module';
import { ServiceModule } from './modules/service/service.module';
import { UserModule } from './modules/user/user.module';
import { UserDetailModule } from './modules/user-detail/user-detail.module';
import { UserTariffModule } from './modules/user-tariff/user-tariff.module';
import { ShotModule } from './modules/shot/shot.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { FileModule } from './modules/file/file.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    UserTariffModule,
    UserDetailModule,
    ParkModule,
    LayerModule,
    PlaceModule,
    TariffModule,
    ServiceModule,
    ShotModule,
    TransactionModule,
    FileModule,
  ]
})
export class AppModule { }
