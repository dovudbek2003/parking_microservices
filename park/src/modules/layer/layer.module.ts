import { Module } from '@nestjs/common';
import { LayerService } from './layer.service';
import { LayerController } from './layer.controller';

@Module({
  controllers: [LayerController],
  providers: [LayerService],
})
export class LayerModule {}
