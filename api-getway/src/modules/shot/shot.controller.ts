import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShotService } from './shot.service';
import { CreateShotDto } from './dto/create-shot.dto';
import { UpdateShotDto } from './dto/update-shot.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('shot')
@Controller('shot')
export class ShotController {
  constructor(private readonly shotService: ShotService) { }

  @Post()
  create(@Body() createShotDto: CreateShotDto) {
    return this.shotService.create(createShotDto);
  }

  @Get()
  findAll() {
    return this.shotService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shotService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShotDto: UpdateShotDto) {
    return this.shotService.update({ ...updateShotDto, id: +id });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shotService.remove(+id);
  }
}
