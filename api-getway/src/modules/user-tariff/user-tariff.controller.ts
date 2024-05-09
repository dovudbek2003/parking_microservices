import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserTariffService } from './user-tariff.service';
import { CreateUserTariffDto } from './dto/create-user-tariff.dto';
import { UpdateUserTariffDto } from './dto/update-user-tariff.dto';
import { ApiTags } from '@nestjs/swagger';
import { TariffService } from '../tariff/tariff.service';
import { Observable, lastValueFrom } from 'rxjs';
import { ITariffResponseData } from '../tariff/interfaces/user-tariff.interface';
import { UserService } from '../user/user.service';

@ApiTags('user-tariff')
@Controller('user-tariff')
export class UserTariffController {
  constructor(
    private readonly userTariffService: UserTariffService,
    private readonly userService: UserService,
    private readonly tariffService: TariffService
  ) { }

  @Post()
  async create(@Body() createUserTariffDto: CreateUserTariffDto) {
    const userObservable: Observable<any> = await this.userService.findOne(createUserTariffDto.userId);
    const { data: foundUser } = await lastValueFrom(userObservable);
    const tariffObservable: Observable<ITariffResponseData> = await this.tariffService.findOne(createUserTariffDto.tariffId)
    const { data: foundTariff }: ITariffResponseData = await lastValueFrom(tariffObservable)
    return this.userTariffService.create(createUserTariffDto, foundUser, foundTariff);
  }

  @Get()
  async findAll() {
    return this.userTariffService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userTariffService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserTariffDto: UpdateUserTariffDto) {
    const userObservable: Observable<any> = await this.userService.findOne(updateUserTariffDto.userId);
    const { data: foundUser } = await lastValueFrom(userObservable);
    const tariffObservable: Observable<ITariffResponseData> = await this.tariffService.findOne(updateUserTariffDto.tariffId)
    const { data: foundTariff }: ITariffResponseData = await lastValueFrom(tariffObservable)
    return this.userTariffService.update({ ...updateUserTariffDto, id: +id }, foundUser, foundTariff);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userTariffService.remove(+id);
  }
}
