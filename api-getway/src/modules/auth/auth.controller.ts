import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserClientDto, CreateUserOwnerDto } from './dto/create-user-dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  login(@Body() loginAuthDto: LoginDto) {
    return this.authService.login(loginAuthDto);
  }

  @Post('/client-register')
  clientRegister(@Body() сreateUserClientDto: CreateUserClientDto) {
    return this.authService.registrClient(сreateUserClientDto);
  }

  @Post('/owner-register')
  ownerRegister(@Body() сreateUserOwnerDto: CreateUserOwnerDto) {
    return this.authService.registrOwner(сreateUserOwnerDto);
  }
}
