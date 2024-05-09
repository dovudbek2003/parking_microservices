import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod, MessagePattern, Payload } from '@nestjs/microservices';
import { UserDetailService } from './user-detail.service';
import { CreateUserDetailDto } from './dto/create-user-detail.dto';
import { UpdateUserDetailDto } from './dto/update-user-detail.dto';
import { IUserService } from '../user/interfaces/user.service';

@Controller()
export class UserDetailController {
  constructor(
    @Inject('IUserDetailService') private readonly userDetailService: UserDetailService,
    @Inject('IUserService') private readonly userService: IUserService
  ) { }

  @GrpcMethod('UserDetailService', 'Create')
  async create(@Payload() createUserDetailDto: CreateUserDetailDto) {
    return this.userDetailService.create(createUserDetailDto);
  }

  @GrpcMethod('UserDetailService', 'FindAll')
  async findAll() {
    return this.userDetailService.findAll();
  }

  @GrpcMethod('UserDetailService', 'FindOne')
  async findOne(@Payload() { id }: { id: number }) {
    return this.userDetailService.findOne(id);
  }

  @GrpcMethod('UserDetailService', 'Update')
  async update(@Payload() updateUserDetailDto: UpdateUserDetailDto) {
    return this.userDetailService.update(updateUserDetailDto.id, updateUserDetailDto);
  }

  @GrpcMethod('UserDetailService', 'Remove')
  async remove(@Payload() { id }: { id: number }) {
    return this.userDetailService.remove(id);
  }
}
