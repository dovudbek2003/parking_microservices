import { Controller, Inject } from '@nestjs/common';
import { CreateTariffDto } from './dto/create-tariff.dto';
import { UpdateTariffDto } from './dto/update-tariff.dto';
import { ITariffService } from './interfaces/tariff.service';
import { IParkService } from '../park/interfaces/park.service';
import { GrpcMethod, Payload } from '@nestjs/microservices';

@Controller('tariff')
export class TariffController {
  constructor(
    @Inject('ITariffService') private readonly tariffService: ITariffService,
    @Inject('IParkService') private readonly parkService: IParkService,
  ) { }

  @GrpcMethod('TariffService', 'Create')
  async create(@Payload() createTariffDto: CreateTariffDto) {
    const { data: foundPark } = await this.parkService.findOne(createTariffDto.parkId);
    return this.tariffService.create(createTariffDto, foundPark);
  }

  @GrpcMethod('TariffService', 'FindAll')
  async findAll() {
    return this.tariffService.findAll();
  }

  @GrpcMethod('TariffService', 'FindOne')
  async findOne(@Payload() { id }: { id: number }) {
    return this.tariffService.findOne(id);
  }

  @GrpcMethod('TariffService', 'Update')
  async update(@Payload() updateTariffDto: UpdateTariffDto) {
    const { data: foundPark } = await this.parkService.findOne(updateTariffDto.parkId);
    return this.tariffService.update(updateTariffDto.id, updateTariffDto, foundPark);
  }

  @GrpcMethod('TariffService', 'Remove')
  async remove(@Payload() { id }: { id: number }) {
    return this.tariffService.remove(id);
  }
}
