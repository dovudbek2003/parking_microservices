import { Module } from '@nestjs/common';
import { LayerService } from './layer.service';
import { LayerController } from './layer.controller';
import { LayerRepository } from './layer.repository';
import { ParkModule } from '../park/park.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Layer } from './entities/layer.entity';

@Module({
  imports: [
    ParkModule,
    TypeOrmModule.forFeature([Layer])
  ],
  controllers: [LayerController],
  providers: [
    { provide: 'ILayerService', useClass: LayerService },
    { provide: 'ILayerRepository', useClass: LayerRepository }
  ],
  exports:[
    { provide: 'ILayerService', useClass: LayerService },
    { provide: 'ILayerRepository', useClass: LayerRepository }
  ]
})
export class LayerModule { }
