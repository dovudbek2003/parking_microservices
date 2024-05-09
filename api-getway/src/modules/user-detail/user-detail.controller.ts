import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserDetailService } from './user-detail.service';
import { CreateUserDetailDto } from './dto/create-user-detail.dto';
import { UpdateUserDetailDto } from './dto/update-user-detail.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { Observable, lastValueFrom } from 'rxjs';

@ApiTags('user-detail')
@Controller('user-detail')
export class UserDetailController {
  constructor(
    private readonly userDetailService: UserDetailService,
    private readonly userService: UserService
  ) { }

  @Post()
  async create(@Body() createUserDetailDto: CreateUserDetailDto) {
    const userObservable: Observable<any> = await this.userService.findOne(createUserDetailDto.userId);
    await lastValueFrom(userObservable)
    return this.userDetailService.create(createUserDetailDto);
  }

  @Get()
  async findAll() {
    return this.userDetailService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userDetailService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDetailDto: UpdateUserDetailDto) {
    return this.userDetailService.update({ ...updateUserDetailDto, id: +id });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userDetailService.remove(+id);
  }
}
