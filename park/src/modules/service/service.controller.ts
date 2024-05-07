import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { IServiceService } from './interfaces/service.service';
import { IParkService } from '../park/interfaces/park.service';
import { ITariffService } from '../tariff/interfaces/tariff.service';
import { GrpcMethod, Payload } from '@nestjs/microservices';

@Controller('service')
export class ServiceController {
  constructor(
    @Inject('IServiceService') private readonly serviceService: IServiceService,
    @Inject('IParkService') private readonly parkService: IParkService,
    @Inject('ITariffService') private readonly tariffService: ITariffService,
  ) { }

  @GrpcMethod('ServiceService', 'Create')
  async create(@Payload() createServiceDto: CreateServiceDto) {
    const { data: foundPark } = await this.parkService.findOne(createServiceDto.parkId);
    const { data: foundTariff } = await this.tariffService.findOne(createServiceDto.tariffId);
    return this.serviceService.create(createServiceDto, foundPark, foundTariff);
  }

  @GrpcMethod('ServiceService', 'FindAll')
  async findAll() {
    return this.serviceService.findAll();
  }

  @GrpcMethod('ServiceService', 'FindOne')
  async findOne(@Payload() { id }: { id: number }) {
    return this.serviceService.findOne(id);
  }

  @GrpcMethod('ServiceService', 'Update')
  async update(@Payload() updateServiceDto: UpdateServiceDto) {
    const { data: foundPark } = await this.parkService.findOne(updateServiceDto.parkId);
    const { data: foundTariff } = await this.tariffService.findOne(updateServiceDto.tariffId);
    return this.serviceService.update(updateServiceDto.id, updateServiceDto, foundPark, foundTariff);
  }

  @GrpcMethod('ServiceService', 'Remove')
  async remove(@Payload() { id }: { id: number }) {
    return this.serviceService.remove(+id);
  }
}
