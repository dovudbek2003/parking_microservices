import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PlaceService } from './place.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LayerService } from '../layer/layer.service';
import { Observable, lastValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { RolesGuard } from '../shared/role.guard';
import { Roles } from 'src/common/decorator/role.decorator';
import { Role } from 'src/common/enums/role.enum';

@ApiTags('place')
@Controller('place')
export class PlaceController {
  constructor(
    private readonly placeService: PlaceService,
    private readonly layerService: LayerService
  ) { }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.OWNER)
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

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.OWNER)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePlaceDto: UpdatePlaceDto) {
    return this.placeService.update({ ...updatePlaceDto, id: +id });
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.OWNER)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.placeService.remove(+id);
  }
}
