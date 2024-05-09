import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TariffService } from './tariff.service';
import { CreateTariffDto } from './dto/create-tariff.dto';
import { UpdateTariffDto } from './dto/update-tariff.dto';
import { ApiTags } from '@nestjs/swagger';
import { ParkService } from '../park/park.service';
import { Observable, lastValueFrom } from 'rxjs';

@ApiTags('tariff')
@Controller('tariff')
export class TariffController {
  constructor(
    private readonly tariffService: TariffService,
    private readonly parkService: ParkService
  ) { }

  @Post()
  async create(@Body() createTariffDto: CreateTariffDto) {
    const parkObservable: Observable<any> = await this.parkService.findOne(createTariffDto.parkId)
    await lastValueFrom(parkObservable)
    return this.tariffService.create(createTariffDto);
  }

  @Get()
  async findAll() {
    return this.tariffService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.tariffService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTariffDto: UpdateTariffDto) {
    if(updateTariffDto.parkId || updateTariffDto.parkId === 0){
      const parkObservable: Observable<any> = await this.parkService.findOne(updateTariffDto.parkId)
      await lastValueFrom(parkObservable)
    }
    return this.tariffService.update({ ...updateTariffDto, id: +id });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.tariffService.remove(+id);
  }
}
