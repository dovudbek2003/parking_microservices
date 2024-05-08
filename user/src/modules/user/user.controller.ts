import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserService } from './interfaces/user.service';

@Controller()
export class UserController {
  constructor(@Inject('IUserService') private readonly userService: IUserService) { }

  @GrpcMethod('UserService', 'Create')
  create(@Payload() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @GrpcMethod('UserService', 'FindAll')
  findAll() {
    return this.userService.findAll();
  }

  @GrpcMethod('UserService', 'FindOne')
  findOne(@Payload() { id }: { id: number }) {
    return this.userService.findOne(id);
  }

  @GrpcMethod('UserService', 'Update')
  update(@Payload() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto.id, updateUserDto);
  }

  @GrpcMethod('UserService', 'Remove')
  remove(@Payload() { id }: { id: number }) {
    return this.userService.remove(id);
  }
}
