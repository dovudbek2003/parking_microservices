import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { LayerService } from './layer.service';
import { CreateLayerDto } from './dto/create-layer.dto';
import { UpdateLayerDto } from './dto/update-layer.dto';
import { ApiTags } from '@nestjs/swagger';
import { ParkService } from '../park/park.service';
import { Observable, lastValueFrom } from 'rxjs';

@ApiTags('layer')
@Controller('layer')
export class LayerController {
  constructor(
    private readonly layerService: LayerService,
    private readonly parkService: ParkService
  ) { }

  @Post()
  async create(@Body() createLayerDto: CreateLayerDto) {
    const parkObservable: Observable<any> = await this.parkService.findOne(createLayerDto.parkId)
    await lastValueFrom(parkObservable)
    return this.layerService.create(createLayerDto);
  }

  @Get()
  async findAll() {
    return this.layerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.layerService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateLayerDto: UpdateLayerDto) {
    const parkObservable: Observable<any> = await this.parkService.findOne(updateLayerDto.parkId)
    await lastValueFrom(parkObservable)
    return this.layerService.update(+id, updateLayerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.layerService.remove(+id);
  }
}
