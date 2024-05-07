import { Module } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceController } from './place.controller';
import { PlaceRepository } from './place.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from './entities/place.entity';
import { LayerModule } from '../layer/layer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Place]),
    LayerModule
  ],
  controllers: [PlaceController],
  providers: [
    {provide: 'IPlaceService', useClass: PlaceService},
    {provide: 'IPlaceRepository', useClass: PlaceRepository}
  ],
})
export class PlaceModule {}
