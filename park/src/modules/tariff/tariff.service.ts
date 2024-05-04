import { Injectable } from '@nestjs/common';
import { CreateTariffDto } from './dto/create-tariff.dto';
import { UpdateTariffDto } from './dto/update-tariff.dto';

@Injectable()
export class TariffService {
  create(createTariffDto: CreateTariffDto) {
    return 'This action adds a new tariff';
  }

  findAll() {
    return `This action returns all tariff`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tariff`;
  }

  update(id: number, updateTariffDto: UpdateTariffDto) {
    return `This action updates a #${id} tariff`;
  }

  remove(id: number) {
    return `This action removes a #${id} tariff`;
  }
}
