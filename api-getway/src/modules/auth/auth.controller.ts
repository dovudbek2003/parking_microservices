import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-auth.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserClientDto, CreateUserOwnerDto } from './dto/create-user-dto';
import { ParkService } from '../park/park.service';
import { Observable, lastValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { RolesGuard } from '../shared/role.guard';
import { Roles } from 'src/common/decorator/role.decorator';
import { Role } from 'src/common/enums/role.enum';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly parkService: ParkService
  ) { }

  @Post('login')
  async login(@Body() loginAuthDto: LoginDto) {
    return this.authService.login(loginAuthDto);
  }

  @Post('/client-register')
  async clientRegister(@Body() createUserClientDto: CreateUserClientDto) {
    console.log(createUserClientDto)
    if (createUserClientDto.parkId || createUserClientDto.parkId === 0) {
      const data: Observable<any> = await this.parkService.findOne(createUserClientDto.parkId)
      await lastValueFrom(data)
    }
    return this.authService.registrClient(createUserClientDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post('/owner-register')
  async ownerRegister(@Body() createUserOwnerDto: CreateUserOwnerDto) {
    console.log(createUserOwnerDto)
    if (createUserOwnerDto.parkId || createUserOwnerDto.parkId === 0) {
      const data: Observable<any> = await this.parkService.findOne(createUserOwnerDto.parkId)
      await lastValueFrom(data)
    }
    return this.authService.registrOwner(createUserOwnerDto);
  }
}
