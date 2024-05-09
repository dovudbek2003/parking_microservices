import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { ParkService } from './park.service';
import { CreateParkDto } from './dto/create-park.dto';
import { UpdateParkDto } from './dto/update-park.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { RolesGuard } from '../shared/role.guard';
import { Roles } from 'src/common/decorator/role.decorator';
import { Role } from 'src/common/enums/role.enum';
import { UserService } from '../user/user.service';
import { IUserResponseData } from '../user/interfaces/user.interfaces';
import { Observable, lastValueFrom } from 'rxjs';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { Redis } from 'src/common/enums/redis.enum';

@ApiTags('park')
@Controller('park')
export class ParkController {
  constructor(
    private readonly parkService: ParkService,
    private readonly userService: UserService
  ) { }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.OWNER)
  @Post()
  async create(@Body() createParkDto: CreateParkDto) {
    if (createParkDto.owner || createParkDto.owner === 0) {
      const userObservable: Observable<IUserResponseData> = await this.userService.findOne(createParkDto.owner)
      await lastValueFrom(userObservable)
    }

    return this.parkService.create(createParkDto);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheKey(Redis.ALL_PARKS)
  @CacheTTL(0)
  @Get()
  async findAll() {
    return this.parkService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.parkService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.OWNER)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateParkDto: UpdateParkDto) {
    if (updateParkDto.owner || updateParkDto.owner === 0) {
      const userObservable: Observable<IUserResponseData> = await this.userService.findOne(updateParkDto.owner)
      await lastValueFrom(userObservable)
    }
    return this.parkService.update({ ...updateParkDto, id: +id });
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.OWNER)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.parkService.remove(+id);
  }
}
