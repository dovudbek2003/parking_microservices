import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { CreateUserTariffDto } from './dto/create-user-tariff.dto';
import { UpdateUserTariffDto } from './dto/update-user-tariff.dto';
import { IUserTariffService } from './interfaces/user-tariff.service';

@Controller()
export class UserTariffController {
  constructor(
    @Inject('IUserTariffService') private readonly userTariffService: IUserTariffService,
  ) { }

  @GrpcMethod('UserTariffService', 'Create')
  async create(createUserTariffDto: CreateUserTariffDto) {
    return this.userTariffService.create(createUserTariffDto, createUserTariffDto.foundUser, createUserTariffDto.foundTariff);
  }

  @GrpcMethod('UserTariffService', 'FindAll')
  async findAll() {
    return this.userTariffService.findAll();
  }

  @GrpcMethod('UserTariffService', 'FindOne')
  async findOne({ id }: { id: number }) {
    return this.userTariffService.findOne(id);
  }

  @GrpcMethod('UserTariffService', 'Update')
  async update(updateUserTariffDto: UpdateUserTariffDto) {
    return this.userTariffService.update(updateUserTariffDto.id, updateUserTariffDto, updateUserTariffDto.foundUser, updateUserTariffDto.foundTariff);
  }

  @GrpcMethod('UserTariffService', 'Remove')
  async remove({ id }: { id: number }) {
    return this.userTariffService.remove(id);
  }
}
