import { Inject, Injectable } from '@nestjs/common';
import { CreateUserTariffDto } from './dto/create-user-tariff.dto';
import { UpdateUserTariffDto } from './dto/update-user-tariff.dto';
import { USER_PACKAGE } from 'src/common/const/servers';
import { ClientGrpc } from '@nestjs/microservices';
import { ITariff } from '../tariff/interfaces/user-tariff.interface';

@Injectable()
export class UserTariffService {
  private userTariffService: any;

  constructor(
    @Inject(USER_PACKAGE) private userTariffClient: ClientGrpc,
  ) { }

  onModuleInit() {
    this.userTariffService = this.userTariffClient.getService<any>('UserTariffService');
  }
  async create(createUserTariffDto: CreateUserTariffDto, foundUser: any, foundTariff: ITariff) {
    return this.userTariffService.create({ ...createUserTariffDto, foundUser, foundTariff });
  }

  async findAll() {
    return this.userTariffService.findAll({});
  }

  async findOne(id: number) {
    return this.userTariffService.findOne({ id });
  }

  async update(updateUserTariffDto: UpdateUserTariffDto, foundUser: any | null, foundTariff: ITariff | null) {
    const newUpdateUserTariffDto = updateUserTariffDto
    if (foundUser) {
      newUpdateUserTariffDto.foundUser = foundUser
    } else {
      newUpdateUserTariffDto.foundUser = null
    }

    if (foundTariff) {
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
