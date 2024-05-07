import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { LayerService } from './layer.service';
import { CreateLayerDto } from './dto/create-layer.dto';
import { UpdateLayerDto } from './dto/update-layer.dto';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { ILayerService } from './interfaces/layer.service';
import { IParkService } from '../park/interfaces/park.service';

@Controller('layer')
export class LayerController {
  constructor(
    @Inject('ILayerService') private readonly layerService: ILayerService,
    @Inject('IParkService') private readonly parkService: IParkService
  ) { }

  @GrpcMethod('LayerService', 'Create')
  async create(@Payload() createLayerDto: CreateLayerDto) {
    const { data: foundPark } = await this.parkService.findOne(createLayerDto.parkId)
    return this.layerService.create(createLayerDto, foundPark);
  }

  @GrpcMethod('LayerService', 'FindAll')
  async findAll() {
    return this.layerService.findAll();
  }

  @GrpcMethod('LayerService', 'FindOne')
  async findOne(@Payload() { id }: { id: number }) {
    return this.layerService.findOne(id);
  }

  @GrpcMethod('LayerService', 'Update')
  async update(@Payload() updateLayerDto: UpdateLayerDto) {
    const { data: foundPark } = await this.parkService.findOne(updateLayerDto.parkId)
    return this.layerService.update(updateLayerDto.id, updateLayerDto, foundPark);
  }

  @GrpcMethod('LayerService', 'Remove')
  async remove(@Payload() { id }: { id: number }) {
    return this.layerService.remove(id);
  }
}
