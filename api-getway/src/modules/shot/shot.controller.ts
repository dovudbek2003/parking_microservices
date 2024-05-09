import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ShotService } from './shot.service';
import { CreateShotDto } from './dto/create-shot.dto';
import { UpdateShotDto } from './dto/update-shot.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { Observable, lastValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { RolesGuard } from '../shared/role.guard';

@ApiTags('shot')
@Controller('shot')
export class ShotController {
  constructor(
    private readonly shotService: ShotService,
    private readonly userService: UserService
  ) { }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() createShotDto: CreateShotDto) {
    const userObservable: Observable<any> = await this.userService.findOne(createShotDto.userId)
    await lastValueFrom(userObservable)
    return this.shotService.create(createShotDto);
  }

  @Get()
  async findAll() {
    return this.shotService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.shotService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateShotDto: UpdateShotDto) {
    return this.shotService.update({ ...updateShotDto, id: +id });
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.shotService.remove(+id);
  }
}
