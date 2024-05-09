import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserTariffService } from './user-tariff.service';
import { CreateUserTariffDto } from './dto/create-user-tariff.dto';
import { UpdateUserTariffDto } from './dto/update-user-tariff.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TariffService } from '../tariff/tariff.service';
import { Observable, lastValueFrom } from 'rxjs';
import { ITariffResponseData } from '../tariff/interfaces/user-tariff.interface';
import { UserService } from '../user/user.service';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { RolesGuard } from '../shared/role.guard';

@ApiTags('user-tariff')
@Controller('user-tariff')
export class UserTariffController {
  constructor(
    private readonly userTariffService: UserTariffService,
    private readonly userService: UserService,
    private readonly tariffService: TariffService
  ) { }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
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

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserTariffDto: UpdateUserTariffDto) {
    const userObservable: Observable<any> = await this.userService.findOne(updateUserTariffDto.userId);
    const { data: foundUser } = await lastValueFrom(userObservable);
    const tariffObservable: Observable<ITariffResponseData> = await this.tariffService.findOne(updateUserTariffDto.tariffId)
    const { data: foundTariff }: ITariffResponseData = await lastValueFrom(tariffObservable)
    return this.userTariffService.update({ ...updateUserTariffDto, id: +id }, foundUser, foundTariff);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userTariffService.remove(+id);
  }
}
