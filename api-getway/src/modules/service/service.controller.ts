import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiTags } from '@nestjs/swagger';
import { ParkService } from '../park/park.service';
import { UserService } from '../user/user.service';
import { TariffService } from '../tariff/tariff.service';
import { Observable, lastValueFrom } from 'rxjs';

@ApiTags('service')
@Controller('service')
export class ServiceController {
  constructor(
    private readonly serviceService: ServiceService,
    private readonly parkService: ParkService,
    private readonly userService: UserService,
    private readonly tariffService: TariffService,
  ) { }

  @Post()
  async create(@Body() createServiceDto: CreateServiceDto) {
    const parkObservable: Observable<any> = await this.parkService.findOne(createServiceDto.parkId);
    await lastValueFrom(parkObservable);
    const userObservable: Observable<any> = await this.userService.findOne(createServiceDto.userId);
    await lastValueFrom(userObservable);
    const tariffObservable: Observable<any> = await this.tariffService.findOne(createServiceDto.tariffId);
    await lastValueFrom(tariffObservable);
    return this.serviceService.create(createServiceDto);
  }

  @Get()
  async findAll() {
    return this.serviceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.serviceService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.serviceService.update({ ...updateServiceDto, id: +id });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.serviceService.remove(+id);
  }
}
