import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { ServiceRepository } from './service.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { ParkModule } from '../park/park.module';
import { TariffModule } from '../tariff/tariff.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Service]),
    ParkModule,
    TariffModule
  ],
  controllers: [ServiceController],
  providers: [
    { provide: 'IServiceService', useClass: ServiceService },
    { provide: 'IServiceRepository', useClass: ServiceRepository }
  ],
})
export class ServiceModule { }
