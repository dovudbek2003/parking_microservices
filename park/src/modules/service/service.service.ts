import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { IServiceService } from './interfaces/service.service';
import { IServiceRepository } from './interfaces/service.repository';
import { ResponseData } from 'src/lib/response-data';
import { Park } from '../park/entities/park.entity';
import { Tariff } from '../tariff/entities/tariff.entity';
import { Service } from './entities/service.entity';
import { ServiceNotFound, TariffIdOrPriceMustBeEntered } from './exception/service.exception';

@Injectable()
export class ServiceService implements IServiceService {
  constructor(@Inject('IServiceRepository') private readonly serviceRepository: IServiceRepository) { }

  // CREATE
  async create(createServiceDto: CreateServiceDto, foundPark: Park, foundTariff: Tariff): Promise<ResponseData<Service>> {
    if (!foundTariff && !createServiceDto.price) {
      throw new TariffIdOrPriceMustBeEntered()
    }

    const newService = new Service()
    newService.parkId = createServiceDto.parkId;
    newService.userId = createServiceDto.userId;
    newService.startedAt = createServiceDto.startedAt;

    if (foundTariff) {
      newService.price = foundTariff.price;
      newService.tariffId = createServiceDto.tariffId;

      const timestamp = createServiceDto.startedAt;
      const date = new Date(timestamp);

      const hoursInMillis = foundTariff.time * 60 * 60 * 1000;

      const newDate = new Date(date.getTime() + hoursInMillis);

      // const newTime = newDate.toISOString()

      newService.endedAt = newDate;

    } else {
      newService.price = createServiceDto.price;
      newService.endedAt = createServiceDto.endedAt;
    }

    const createdService = await this.serviceRepository.create(newService);
    return new ResponseData<Service>('create', 201, createdService)
  }

  // READ
  async findAll(): Promise<ResponseData<Service[]>> {
    const services = await this.serviceRepository.findAll()
    return new ResponseData<Array<Service>>('findAll', 200, services)
  }
  async findOne(id: number): Promise<ResponseData<Service>> {
    const service = await this.serviceRepository.findOne(id);
    if (!service) {
      throw new ServiceNotFound()
    }

    return new ResponseData<Service>('get one', 200, service)
  }

  // UPDATE
  async update(id: number, updateServiceDto: UpdateServiceDto, foundPark: Park, foundTariff: Tariff): Promise<ResponseData<Service>> {
    if (!foundTariff && !updateServiceDto.price) {
      throw new TariffIdOrPriceMustBeEntered()
    }

    const { data: foundService } = await this.findOne(id);
    foundService.parkId = updateServiceDto.parkId ? updateServiceDto.parkId : foundService.parkId;
    foundService.userId = updateServiceDto.userId ? updateServiceDto.userId : foundService.userId;
    foundService.startedAt = updateServiceDto.startedAt ? updateServiceDto.startedAt : foundService.startedAt;

    if (foundTariff) {
      foundService.price = foundTariff.price;
      foundService.tariffId = updateServiceDto.tariffId;

      const timestamp = updateServiceDto.startedAt;
      const date = new Date(timestamp);

      const hoursInMillis = foundTariff.time * 60 * 60 * 1000;

      const newDate = new Date(date.getTime() + hoursInMillis);

      // const newTime = newDate.toISOString()

      foundService.endedAt = newDate;
    } else {
      foundService.price = updateServiceDto.price;
      foundService.endedAt = updateServiceDto.endedAt ? updateServiceDto.endedAt : foundService.endedAt;
    }

    const updatedService = await this.serviceRepository.update(foundService);
    return new ResponseData<Service>('update', 200, updatedService)
  }

  // DELETE
  async remove(id: number): Promise<ResponseData<Service>> {
    await this.findOne(id)
    const deletedService = await this.serviceRepository.remove(id);
    return new ResponseData<Service>('delete', 200, deletedService)
  }
}
