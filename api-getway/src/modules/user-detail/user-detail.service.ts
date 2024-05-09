import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDetailDto } from './dto/create-user-detail.dto';
import { UpdateUserDetailDto } from './dto/update-user-detail.dto';
import { USER_PACKAGE } from 'src/common/const/servers';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class UserDetailService {
  private userDetailService: any;

  constructor(@Inject(USER_PACKAGE) private readonly userDetailClient: ClientGrpc) { }

  onModuleInit() {
    this.userDetailService = this.userDetailClient.getService<any>('UserDetailService');
  }
  async create(createUserDetailDto: CreateUserDetailDto) {
    return this.userDetailService.create(createUserDetailDto);
  }

  async findAll() {
    return this.userDetailService.findAll({});
  }

  async findOne(id: number) {
    return this.userDetailService.findOne({ id });;
  }

  async update(updateUserDetailDto: UpdateUserDetailDto) {
    return this.userDetailService.update(updateUserDetailDto);
  }

  async remove(id: number) {
    return this.userDetailService.remove({ id });
  }
}
