import { Module } from '@nestjs/common';
import { ShotService } from './shot.service';
import { ShotController } from './shot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shot } from './entities/shot.entity';
import { ShotRepository } from './shot.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Shot])],
  controllers: [ShotController],
  providers: [
    { provide: 'IShotService', useClass: ShotService },
    { provide: 'IShotRepository', useClass: ShotRepository }
  ],
  exports : [
    { provide: 'IShotService', useClass: ShotService },
    { provide: 'IShotRepository', useClass: ShotRepository }
  ]
})
export class ShotModule { }
