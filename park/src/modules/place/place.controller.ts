import { Controller, Inject } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { IPlaceService } from './interfaces/place.service';
import { GrpcMethod, Payload } from '@nestjs/microservices';

@Controller('place')
export class PlaceController {
  constructor(
    @Inject('IPlaceService') private readonly placeService: IPlaceService,
  ) { }

  @GrpcMethod('PlaceService', 'Create')
  async create(@Payload() createPlaceDto: CreatePlaceDto) {
    return this.placeService.create(createPlaceDto);
  }

  @GrpcMethod('PlaceService', 'FindAll')
  async findAll() {
    return this.placeService.findAll();
  }

  @GrpcMethod('PlaceService', 'FindOne')
  async findOne(@Payload() { id }: { id: number }) {
    return this.placeService.findOne(id);
  }

  @GrpcMethod('PlaceService', 'Update')
  async update(@Payload() updatePlaceDto: UpdatePlaceDto) {
    return this.placeService.update(updatePlaceDto.id, updatePlaceDto);
  }

  @GrpcMethod('PlaceService', 'Remove')
  async remove(@Payload() { id }: { id: number }) {
    return this.placeService.remove(id);
  }
}
