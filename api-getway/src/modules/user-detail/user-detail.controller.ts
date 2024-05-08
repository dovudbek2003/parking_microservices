import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserDetailService } from './user-detail.service';
import { CreateUserDetailDto } from './dto/create-user-detail.dto';
import { UpdateUserDetailDto } from './dto/update-user-detail.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user-detail')
@Controller('user-detail')
export class UserDetailController {
  constructor(private readonly userDetailService: UserDetailService) { }

  @Post()
  create(@Body() createUserDetailDto: CreateUserDetailDto) {
    return this.userDetailService.create(createUserDetailDto);
  }

  @Get()
  findAll() {
    return this.userDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userDetailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDetailDto: UpdateUserDetailDto) {
    return this.userDetailService.update({ ...updateUserDetailDto, id: +id });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userDetailService.remove(+id);
  }
}
