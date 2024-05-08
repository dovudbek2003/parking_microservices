import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDetailDto } from './dto/create-user-detail.dto';
import { UpdateUserDetailDto } from './dto/update-user-detail.dto';
import { IUserDetailRepository } from './interfaces/user-detail.repository';
import { UserDetail } from './entities/user-detail.entity';
import { IUserDetailService } from './interfaces/user-detail.service';
import { ResponseData } from 'src/lib/response-data';
import { User } from '../user/entities/user.entity';
import { UserDetailNotFound } from './exception/user-detail.exception';

@Injectable()
export class UserDetailService implements IUserDetailService {
  constructor(@Inject('IUserDetailRepository') private readonly userDetailRepository: IUserDetailRepository) { }

  // CREATE
  async create(createUserDetailDto: CreateUserDetailDto, foundUser: User): Promise<ResponseData<UserDetail>> {
    const newUserDetail = new UserDetail()

    newUserDetail.firstName = createUserDetailDto.firstname;
    newUserDetail.lastName = createUserDetailDto.lastname;
    newUserDetail.avatar = createUserDetailDto.avatar;
    newUserDetail.userId = createUserDetailDto.userId;
    newUserDetail.user = foundUser;

    const createdUserDetail = await this.userDetailRepository.create(newUserDetail);

    return new ResponseData<UserDetail>('create', 201, createdUserDetail)
  }

  // READ
  async findAll(): Promise<ResponseData<UserDetail[]>> {
    const userDetails = await this.userDetailRepository.findAll();
    return new ResponseData<Array<UserDetail>>('findAll', 200, userDetails)
  }
  async findOne(id: number): Promise<ResponseData<UserDetail>> {
    const userDetail = await this.userDetailRepository.findOne(id);
    if (!userDetail) {
      throw new UserDetailNotFound()
    }
    return new ResponseData<UserDetail>('get one', 200, userDetail)
  }

  // UPDATE
  async update(id: number, updateUserDetailDto: UpdateUserDetailDto, foundUser: User): Promise<ResponseData<UserDetail>> {
    const { data: foundUserDetail } = await this.findOne(id)

    foundUserDetail.firstName = updateUserDetailDto.firstname ? updateUserDetailDto.firstname : foundUserDetail.firstName;
    foundUserDetail.lastName = updateUserDetailDto.lastname ? updateUserDetailDto.lastname : foundUserDetail.lastName;
    foundUserDetail.avatar = updateUserDetailDto.avatar ? updateUserDetailDto.avatar : foundUserDetail.avatar;
    foundUserDetail.userId = updateUserDetailDto.userId ? updateUserDetailDto.userId : foundUserDetail.userId;
    foundUserDetail.user = foundUser;

    const updatedUserDetail = await this.userDetailRepository.update(foundUserDetail);
    return new ResponseData<UserDetail>('update', 200, updatedUserDetail)
  }

  // DELETE
  async remove(id: number): Promise<ResponseData<UserDetail>> {
    await this.findOne(id);
    const deletedUserDetail = await this.userDetailRepository.remove(id);
    return new ResponseData<UserDetail>('delete', 200, deletedUserDetail)
  }
}
