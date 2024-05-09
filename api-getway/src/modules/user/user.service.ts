import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_PACKAGE } from 'src/common/const/servers';
import { ClientGrpc } from '@nestjs/microservices';
import { Cache } from 'cache-manager';
import { Redis } from 'src/common/enums/redis.enum';

@Injectable()
export class UserService {
  private userService: any;

  constructor(
    @Inject(USER_PACKAGE) private userClient: ClientGrpc,
    @Inject("CACHE_MANAGER") private cacheManager: Cache,
  ) { }

  onModuleInit() {
    this.userService = this.userClient.getService<any>('UserService');
  }

  async findAll() {
    return this.userService.findAll({});
  }

  async findOne(id: number) {
    return this.userService.findOne({ id });
  }

  async update(updateUserDto: UpdateUserDto) {
    await this.cacheManager.del(Redis.All_USERS)
    return this.userService.update(updateUserDto);
  }

  async remove(id: number) {
    await this.cacheManager.del(Redis.All_USERS)
    return this.userService.remove({ id });;
  }
}
