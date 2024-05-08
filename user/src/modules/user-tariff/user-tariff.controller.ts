import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { CreateUserTariffDto } from './dto/create-user-tariff.dto';
import { UpdateUserTariffDto } from './dto/update-user-tariff.dto';
import { IUserTariffService } from './interfaces/user-tariff.service';
import { IUserService } from '../user/interfaces/user.service';

@Controller()
export class UserTariffController {
  constructor(
    @Inject('IUserTariffService') private readonly userTariffService: IUserTariffService,
    @Inject('IUserService') private readonly userService: IUserService
  ) { }

  @GrpcMethod('UserTariffService', 'Create')
  async create(@Payload() createUserTariffDto: CreateUserTariffDto) {
    const { data: foundUser } = await this.userService.findOne(createUserTariffDto.userId);
    return this.userTariffService.create(createUserTariffDto, foundUser, createUserTariffDto.foundTariff);
  }

  @GrpcMethod('UserTariffService', 'FindAll')
  async findAll() {
    return this.userTariffService.findAll();
  }

  @GrpcMethod('UserTariffService', 'FindOne')
  async findOne(@Payload() { id }: { id: number }) {
    return this.userTariffService.findOne(id);
  }

  @GrpcMethod('UserTariffService', 'Update')
  async update(@Payload() updateUserTariffDto: UpdateUserTariffDto) {
    const { data: foundUser } = await this.userService.findOne(updateUserTariffDto.userId);
    return this.userTariffService.update(updateUserTariffDto.id, updateUserTariffDto, foundUser, updateUserTariffDto.foundTariff);
  }

  @GrpcMethod('UserTariffService', 'Remove')
  async remove(@Payload() { id }: { id: number }) {
    return this.userTariffService.remove(id);
  }
}
