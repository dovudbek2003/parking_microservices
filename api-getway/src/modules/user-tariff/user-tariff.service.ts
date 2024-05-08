import { Inject, Injectable } from '@nestjs/common';
import { CreateUserTariffDto } from './dto/create-user-tariff.dto';
import { UpdateUserTariffDto } from './dto/update-user-tariff.dto';
import { PARK_PACKAGE, USER_PACKAGE } from 'src/common/const/servers';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable, lastValueFrom } from 'rxjs';
import { ITariffResponseData } from '../tariff/interfaces/user-tariff.interface';

@Injectable()
export class UserTariffService {
  private userTariffService: any;
  private tariffService: any;

  constructor(
    @Inject(USER_PACKAGE) private userTariffClient: ClientGrpc,
    @Inject(PARK_PACKAGE) private tariffClient: ClientGrpc
  ) { }

  onModuleInit() {
    this.userTariffService = this.userTariffClient.getService<any>('UserTariffService');
    this.tariffService = this.tariffClient.getService<any>('TariffService');
  }
  async create(createUserTariffDto: CreateUserTariffDto) {
    const tariffObservable: Observable<ITariffResponseData> = this.tariffService.findOne(createUserTariffDto.tariffId)
    const { data: foundTariff }: ITariffResponseData = await lastValueFrom(tariffObservable)

    return this.userTariffService.create({ ...createUserTariffDto, foundTariff });
  }

  async findAll() {
    return this.userTariffService.findAll({});
  }

  async findOne(id: number) {
    return this.userTariffService.findOne({ id });
  }

  async update(updateUserTariffDto: UpdateUserTariffDto) {
    const newUpdateUserTariffDto = updateUserTariffDto
    if (updateUserTariffDto.tariffId) {
      const tariffObservable: Observable<ITariffResponseData> = this.tariffService.findOne(updateUserTariffDto.tariffId)
      const { data: foundTariff }: ITariffResponseData = await lastValueFrom(tariffObservable)
      newUpdateUserTariffDto.foundTariff = foundTariff
    } else {
      newUpdateUserTariffDto.foundTariff = null
    }
    return this.userTariffService.update(newUpdateUserTariffDto);
  }

  async remove(id: number) {
    return this.userTariffService.remove({ id });
  }
}
