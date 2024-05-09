import { Controller, Inject } from '@nestjs/common';
import { CreateLayerDto } from './dto/create-layer.dto';
import { UpdateLayerDto } from './dto/update-layer.dto';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { ILayerService } from './interfaces/layer.service';

@Controller('layer')
export class LayerController {
  constructor(
    @Inject('ILayerService') private readonly layerService: ILayerService,
  ) { }

  @GrpcMethod('LayerService', 'Create')
  async create(createLayerDto: CreateLayerDto) {
    return this.layerService.create(createLayerDto);
  }

  @GrpcMethod('LayerService', 'FindAll')
  async findAll() {
    return this.layerService.findAll();
  }

  @GrpcMethod('LayerService', 'FindOne')
  async findOne({ id }: { id: number }) {
    return this.layerService.findOne(id);
  }

  @GrpcMethod('LayerService', 'Update')
  async update(updateLayerDto: UpdateLayerDto) {
    return this.layerService.update(updateLayerDto.id, updateLayerDto);
  }

  @GrpcMethod('LayerService', 'Remove')
  async remove({ id }: { id: number }) {
    return this.layerService.remove(id);
  }
}
