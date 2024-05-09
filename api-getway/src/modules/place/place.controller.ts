import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlaceService } from './place.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { ApiTags } from '@nestjs/swagger';
import { LayerService } from '../layer/layer.service';
import { Observable, lastValueFrom } from 'rxjs';

@ApiTags('place')
@Controller('place')
export class PlaceController {
  constructor(
    private readonly placeService: PlaceService,
    private readonly layerService: LayerService
  ) { }

  @Post()
  async create(@Body() createPlaceDto: CreatePlaceDto) {
    const parkObservable: Observable<any> = await this.layerService.findOne(createPlaceDto.layerId)
    await lastValueFrom(parkObservable)
    return this.placeService.create(createPlaceDto);
  }

  @Get()
  async findAll() {
    return this.placeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.placeService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePlaceDto: UpdatePlaceDto) {
    return this.placeService.update({ ...updatePlaceDto, id: +id });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.placeService.remove(+id);
  }
}
