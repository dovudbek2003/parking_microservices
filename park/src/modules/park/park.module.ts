import { Module } from '@nestjs/common';
import { ParkService } from './park.service';
import { ParkController } from './park.controller';

@Module({
  controllers: [ParkController],
  providers: [ParkService],
})
export class ParkModule {}
