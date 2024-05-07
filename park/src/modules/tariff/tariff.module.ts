import { Module } from '@nestjs/common';
import { TariffService } from './tariff.service';
import { TariffController } from './tariff.controller';
import { TariffRepository } from './tariff.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tariff } from './entities/tariff.entity';
import { ParkModule } from '../park/park.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tariff]),
    ParkModule
  ],
  controllers: [TariffController],
  providers: [
    { provide: 'ITariffService', useClass: TariffService },
    { provide: 'ITariffRepository', useClass: TariffRepository }
  ],
  exports: [
    { provide: 'ITariffService', useClass: TariffService },
    { provide: 'ITariffRepository', useClass: TariffRepository }
  ]
})
export class TariffModule { }
