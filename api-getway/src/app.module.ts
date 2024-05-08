import { Module } from '@nestjs/common';
import { ParkModule } from './modules/park/park.module';
import { LayerModule } from './modules/layer/layer.module';
import { PlaceModule } from './modules/place/place.module';
import { TariffModule } from './modules/tariff/tariff.module';
import { ServiceModule } from './modules/service/service.module';
import { UserModule } from './modules/user/user.module';
import { UserDetailModule } from './modules/user-detail/user-detail.module';
import { UserTariffModule } from './modules/user-tariff/user-tariff.module';

@Module({
  imports: [ParkModule, LayerModule, PlaceModule, TariffModule, ServiceModule, UserModule, UserDetailModule, UserTariffModule]
})
export class AppModule { }
