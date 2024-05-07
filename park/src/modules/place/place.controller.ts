import { Controller, Inject } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { IPlaceService } from './interfaces/place.service';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { ILayerService } from '../layer/interfaces/layer.service';

@Controller('place')
export class PlaceController {
  constructor(
    @Inject('IPlaceService') private readonly placeService: IPlaceService,
    @Inject('ILayerService') private readonly layerService: ILayerService
  ) { }

  @GrpcMethod('PlaceService', 'Create')
  async create(@Payload() createPlaceDto: CreatePlaceDto) {
    const { data: foundLayer } = await this.layerService.findOne(createPlaceDto.layerId)
    return this.placeService.create(createPlaceDto, foundLayer);
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
    const { data: foundLayer } = await this.layerService.findOne(updatePlaceDto.layerId)
    return this.placeService.update(updatePlaceDto.id, updatePlaceDto, foundLayer);
  }

  @GrpcMethod('PlaceService', 'Remove')
  async remove(@Payload() { id }: { id: number }) {
    return this.placeService.remove(id);
  }
}
