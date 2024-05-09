import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientGrpc } from '@nestjs/microservices';
import { USER_PACKAGE } from 'src/common/const/servers';
import { LoginDto } from './dto/login-auth.dto';
import { Observable, lastValueFrom } from 'rxjs';
import { PasswordOrLoginWrong } from './exception/auth.exception';
import { isMatch } from 'src/lib/bcrypt';
import { ResponseData } from 'src/lib/response-data';
import { CreateUserClientDto, CreateUserOwnerDto } from './dto/create-user-dto';
import { Cache } from 'cache-manager';
import { Redis } from 'src/common/enums/redis.enum';

@Injectable()
export class AuthService {
  private userService: any;
  constructor(
    @Inject(USER_PACKAGE) private userClient: ClientGrpc,
    @Inject("CACHE_MANAGER") private cacheManager: Cache,
    private jwtService: JwtService
  ) { }

  onModuleInit() {
    this.userService = this.userClient.getService<any>('UserService');
  }

  async registrOwner(createUserOwnerDto: CreateUserOwnerDto) {
    await this.cacheManager.del(Redis.All_USERS)
    return this.userService.create(createUserOwnerDto);
  }
  async registrClient(сreateUserClientDto: CreateUserClientDto) {
    await this.cacheManager.del(Redis.All_USERS)
    return this.userService.create(сreateUserClientDto);
  }

  async login(loginAuthDto: LoginDto) {
    const userData: Observable<any> = this.userService.findByPhone({ phone: loginAuthDto.phone })
    const userResponseData = await lastValueFrom(userData)
    if (userResponseData.statusCode === 404) {
      throw new PasswordOrLoginWrong()
    }

    const isEqual = await isMatch(loginAuthDto.password, userResponseData.data.password)
    if (!isEqual) {
      throw new PasswordOrLoginWrong()
    }

    const token = await this.jwtService.signAsync({ id: userResponseData.data.id })
    return new ResponseData('success', 200, {
      user: userResponseData.data,
      token
    })
  }
}
