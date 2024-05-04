import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParkModule } from './modules/park/park.module';
import { LayerModule } from './modules/layer/layer.module';
import { PlaceModule } from './modules/place/place.module';
import { TariffModule } from './modules/tariff/tariff.module';
import { ServiceModule } from './modules/service/service.module';

@Module({
  imports: [ParkModule, LayerModule, PlaceModule, TariffModule, ServiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
