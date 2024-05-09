import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_PACKAGE } from 'src/common/const/servers';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class UserService {
  private userService: any;

  constructor(
    @Inject(USER_PACKAGE) private userClient: ClientGrpc,
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
    return this.userService.update(updateUserDto);
  }

  async remove(id: number) {
    return this.userService.remove({ id });;
  }
}
