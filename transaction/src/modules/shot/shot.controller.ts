import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { CreateShotDto } from './dto/create-shot.dto';
import { UpdateShotDto } from './dto/update-shot.dto';
import { IShotService } from './interfaces/shot.service';

@Controller()
export class ShotController {
  constructor(@Inject('IShotService') private readonly shotService: IShotService) { }

  @GrpcMethod('ShotService', 'Create')
  create(@Payload() createShotDto: CreateShotDto) {
    return this.shotService.create(createShotDto);
  }

  @GrpcMethod('ShotService', 'FindAll')
  findAll() {
    return this.shotService.findAll();
  }

  @GrpcMethod('ShotService', 'FindOne')
  findOne(@Payload() { id }: { id: number }) {
    return this.shotService.findOne(id);
  }

  @GrpcMethod('ShotService', 'Update')
  update(@Payload() updateShotDto: UpdateShotDto) {
    return this.shotService.update(updateShotDto.id, updateShotDto);
  }

  @GrpcMethod('ShotService', 'Remove')
  remove(@Payload() { id }: { id: number }) {
    return this.shotService.remove(id);
  }
}
