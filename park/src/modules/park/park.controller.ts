import { Controller, Inject } from '@nestjs/common';
import { ParkService } from './park.service';
import { CreateParkDto } from './dto/create-park.dto';
import { UpdateParkDto } from './dto/update-park.dto';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { IParkService } from './interfaces/park.service';

@Controller('park')
export class ParkController {
  constructor(@Inject('IParkService') private readonly parkService: IParkService) { }

  @GrpcMethod('ParkService', 'Create')
  create(@Payload() createParkDto: CreateParkDto) {
    return this.parkService.create(createParkDto);
  }

  @GrpcMethod('ParkService', 'FindAll')
  findAll() {
    return this.parkService.findAll();
  }

  @GrpcMethod('ParkService', 'FindOne')
  findOne(@Payload() { id }: { id: number }) {
    return this.parkService.findOne(id);
  }

  @GrpcMethod('ParkService', 'Update')
  update(@Payload() updateParkDto: UpdateParkDto) {
    return this.parkService.update(updateParkDto.id, updateParkDto);
  }

  @GrpcMethod('ParkService', 'Remove')
  remove(@Payload() { id }: { id: number }) {
    return this.parkService.remove(id);
  }
}
