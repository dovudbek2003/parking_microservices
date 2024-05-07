import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { LayerService } from './layer.service';
import { CreateLayerDto } from './dto/create-layer.dto';
import { UpdateLayerDto } from './dto/update-layer.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('layer')
@Controller('layer')
export class LayerController {
  constructor(private readonly layerService: LayerService) {}

  @Post()
  create(@Body() createLayerDto: CreateLayerDto) {
    return this.layerService.create(createLayerDto);
  }

  @Get()
  findAll() {
    return this.layerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.layerService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateLayerDto: UpdateLayerDto) {
    return this.layerService.update(+id, updateLayerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.layerService.remove(+id);
  }
}
