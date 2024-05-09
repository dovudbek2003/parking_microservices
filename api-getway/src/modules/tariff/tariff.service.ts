import { Inject, Injectable } from '@nestjs/common';
import { CreateTariffDto } from './dto/create-tariff.dto';
import { UpdateTariffDto } from './dto/update-tariff.dto';
import { PARK_PACKAGE } from 'src/common/const/servers';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class TariffService {
  private tariffService: any;
  constructor(
    @Inject(PARK_PACKAGE) private tariffClient: ClientGrpc,
  ) { }

  onModuleInit() {
    this.tariffService = this.tariffClient.getService<any>('TariffService');
  }
  async create(createTariffDto: CreateTariffDto) {
    return this.tariffService.create(createTariffDto);
  }

  async findAll(){
    return this.tariffService.findAll({});
  }

  async findOne(id: number){
    return this.tariffService.findOne({ id });
  }

  async update(updateTariffDto: UpdateTariffDto){
    return this.tariffService.update(updateTariffDto);
  }

  async remove(id: number){
    return this.tariffService.remove({ id });
  }
}
