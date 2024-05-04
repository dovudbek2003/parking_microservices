import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LayerService } from './layer.service';
import { CreateLayerDto } from './dto/create-layer.dto';
import { UpdateLayerDto } from './dto/update-layer.dto';

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLayerDto: UpdateLayerDto) {
    return this.layerService.update(+id, updateLayerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.layerService.remove(+id);
  }
}
