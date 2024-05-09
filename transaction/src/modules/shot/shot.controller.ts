import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { CreateShotDto } from './dto/create-shot.dto';
import { UpdateShotDto } from './dto/update-shot.dto';
import { IShotService } from './interfaces/shot.service';

@Controller()
export class ShotController {
  constructor(@Inject('IShotService') private readonly shotService: IShotService) { }

  @GrpcMethod('ShotService', 'Create')
  create(createShotDto: CreateShotDto) {
    return this.shotService.create(createShotDto);
  }

  @GrpcMethod('ShotService', 'FindAll')
  findAll() {
    return this.shotService.findAll();
  }

  @GrpcMethod('ShotService', 'FindOne')
  findOne({ id }: { id: number }) {
    return this.shotService.findOne(id);
  }

  @GrpcMethod('ShotService', 'FindByUserId')
  findByUserId({ userId }: { userId: number }) {
    return this.shotService._findByUserId(userId);
  }


  @GrpcMethod('ShotService', 'Update')
  update(updateShotDto: UpdateShotDto) {
    return this.shotService.update(updateShotDto.id, updateShotDto);
  }

  @GrpcMethod('ShotService', 'Remove')
  remove({ id }: { id: number }) {
    return this.shotService.remove(id);
  }
}
