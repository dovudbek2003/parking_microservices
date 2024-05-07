import { Inject, Injectable } from '@nestjs/common';
import { CreateTariffDto } from './dto/create-tariff.dto';
import { UpdateTariffDto } from './dto/update-tariff.dto';
import { PARK_PACKAGE } from 'src/common/const/servers';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class TariffService {
  private tariffService: any;
  constructor(  
    @Inject(PARK_PACKAGE) private tariffClient: ClientGrpc
  ) { }

  onModuleInit() {
    this.tariffService = this.tariffClient.getService<any>('TariffService');
  }
  create(createTariffDto: CreateTariffDto): Observable<string> {
    return this.tariffService.create(createTariffDto);
  }

  findAll(): Observable<string> {
    return this.tariffService.findAll({});
  }

  findOne(id: number): Observable<string> {
    return this.tariffService.findOne({ id });
  }

  update(updateTariffDto: UpdateTariffDto): Observable<string> {
    return this.tariffService.update(updateTariffDto);
  }

  remove(id: number): Observable<string> {
    return this.tariffService.remove({ id });
  }
}
