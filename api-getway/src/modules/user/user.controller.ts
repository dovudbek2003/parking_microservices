import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { ParkService } from '../park/park.service';
import { Observable, lastValueFrom } from 'rxjs';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly parkService: ParkService
  ) { }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    if (updateUserDto.parkId || updateUserDto.parkId === 0) {
      const data: Observable<any> = await this.parkService.findOne(updateUserDto.parkId)
      await lastValueFrom(data)
    }
    return this.userService.update({ ...updateUserDto, id: +id });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
