import { Inject, Injectable } from '@nestjs/common';
import { CreateUserTariffDto } from './dto/create-user-tariff.dto';
import { UpdateUserTariffDto } from './dto/update-user-tariff.dto';
import { IUserTariffService } from './interfaces/user-tariff.service';
import { IUserTariffRepository } from './interfaces/user-tariff.repository';
import { ResponseData } from 'src/lib/response-data';
import { User } from '../user/entities/user.entity';
import { UserTariff } from './entities/user-tariff.entity';
import { ITariff } from './interfaces/tariff.interface';
import { UserTariffNotFound } from './exception/user-tariff.exception';

@Injectable()
export class UserTariffService implements IUserTariffService {
  constructor(@Inject('IUserTariffRepository') private readonly userTariffRepository: IUserTariffRepository) { }

  // CREATE
  async create(createUserTariffDto: CreateUserTariffDto, foundUser: User, foundTariff: ITariff | null): Promise<ResponseData<UserTariff>> {
    const newUserTariff = new UserTariff()

    newUserTariff.userId = createUserTariffDto.userId;
    newUserTariff.tariffId = createUserTariffDto.tariffId;
    newUserTariff.startedAt = createUserTariffDto.startedAt;
    newUserTariff.user = foundUser;

    const date = new Date(createUserTariffDto.startedAt);
    const hoursInMillis = foundTariff.time * 60 * 60 * 1000;

    const newDate = new Date(date.getTime() + hoursInMillis);

    newUserTariff.endedAt = newDate;

    const createdUserTariff = await this.userTariffRepository.create(newUserTariff);

    return new ResponseData<UserTariff>('create', 201, createdUserTariff)
  }

  // READ
  async findAll(): Promise<ResponseData<UserTariff[]>> {
    const userTariffs = await this.userTariffRepository.findAll();
    return new ResponseData<Array<UserTariff>>('findAll', 200, userTariffs)
  }
  async findOne(id: number): Promise<ResponseData<UserTariff>> {
    const userTariff = await this.userTariffRepository.findOne(id);
    if (!userTariff) {
      throw new UserTariffNotFound()
    }
    return new ResponseData<UserTariff>('findOne', 200, userTariff)
  }

  // UPDATE
  async update(id: number, updateUserTariffdto: UpdateUserTariffDto, foundUser: User, foundTariff: ITariff | null): Promise<ResponseData<UserTariff>> {
    const { data: foundUserTariff } = await this.findOne(id)

    foundUserTariff.userId = updateUserTariffdto.userId ? updateUserTariffdto.userId : foundUserTariff.userId;
    foundUserTariff.user = foundUser ? foundUser : foundUserTariff.user;
    foundUserTariff.startedAt = updateUserTariffdto.startedAt ? updateUserTariffdto.startedAt : foundUserTariff.startedAt;

    if (foundTariff) {
      foundUserTariff.tariffId = updateUserTariffdto.tariffId

      const date = new Date(updateUserTariffdto.startedAt);
      const hoursInMillis = foundTariff.time * 60 * 60 * 1000;

      const newDate = new Date(date.getTime() + hoursInMillis);

      foundUserTariff.endedAt = newDate;
    }

    const updatedUserTariff = await this.userTariffRepository.update(foundUserTariff);
    return new ResponseData<UserTariff>('update', 200, updatedUserTariff)
  }

  // DELETE
  async remove(id: number): Promise<ResponseData<UserTariff>> {
    await this.findOne(id);
    const deletedUserTariff = await this.userTariffRepository.remove(id);
    return new ResponseData<UserTariff>('delete', 200, deletedUserTariff)
  }
}
