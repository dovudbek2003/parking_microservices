import { Inject, Injectable } from '@nestjs/common';
import { CreateTariffDto } from './dto/create-tariff.dto';
import { UpdateTariffDto } from './dto/update-tariff.dto';
import { ITariffService } from './interfaces/tariff.service';
import { ITariffRepository } from './interfaces/tariff.repository';
import { ResponseData } from 'src/lib/response-data';
import { Park } from '../park/entities/park.entity';
import { Tariff } from './entities/tariff.entity';
import { TariffNotFound } from './exception/tariff.exception';

@Injectable()
export class TariffService implements ITariffService {
  constructor(@Inject('ITariffRepository') private readonly tariffRepository: ITariffRepository) { }

  // CREATE
  async create(createTariffDto: CreateTariffDto, foundPark: Park): Promise<ResponseData<Tariff>> {
    const newTariff = new Tariff()
    newTariff.name = createTariffDto.name;
    newTariff.price = createTariffDto.price;
    newTariff.time = createTariffDto.time;
    newTariff.parkId = createTariffDto.parkId;
    newTariff.park = foundPark;

    const createdTariff = await this.tariffRepository.create(newTariff);

    return new ResponseData<Tariff>('create', 201, createdTariff)
  }

  // READ
  async findAll(): Promise<ResponseData<Tariff[]>> {
    const tariffs = await this.tariffRepository.findAll();
    return new ResponseData<Array<Tariff>>('findAll', 200, tariffs)
  }
  async findOne(id: number): Promise<ResponseData<Tariff>> {
    const tariff = await this.tariffRepository.findOne(id);
    if (!tariff) {
      throw new TariffNotFound()
    }
    return new ResponseData<Tariff>('get one', 200, tariff)
  }

  // UPDATE
  async update(id: number, createTariffDto: CreateTariffDto, foundPark: Park): Promise<ResponseData<Tariff>> {
    const { data: foundTariff } = await this.findOne(id)
    foundTariff.name = createTariffDto.name ? createTariffDto.name : foundTariff.name;
    foundTariff.price = createTariffDto.price ? createTariffDto.price : foundTariff.price;
    foundTariff.time = createTariffDto.time ? createTariffDto.time : foundTariff.time;
    foundTariff.parkId = createTariffDto.parkId ? createTariffDto.parkId : foundTariff.parkId;
    foundTariff.park = foundPark;

    const updatedTariff = await this.tariffRepository.update(foundTariff);
    return new ResponseData<Tariff>('update', 200, updatedTariff)
  }

  // DELETE
  async remove(id: number): Promise<ResponseData<Tariff>> {
    await this.findOne(id);
    const deletedTariff = await this.tariffRepository.remove(id);
    return new ResponseData<Tariff>('delete', 200, deletedTariff)
  }
}
