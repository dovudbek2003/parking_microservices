import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShotService } from './shot.service';
import { CreateShotDto } from './dto/create-shot.dto';
import { UpdateShotDto } from './dto/update-shot.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { Observable, lastValueFrom } from 'rxjs';

@ApiTags('shot')
@Controller('shot')
export class ShotController {
  constructor(
    private readonly shotService: ShotService,
    private readonly userService: UserService
  ) { }

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

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateShotDto: UpdateShotDto) {
    return this.shotService.update({ ...updateShotDto, id: +id });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.shotService.remove(+id);
  }
}
