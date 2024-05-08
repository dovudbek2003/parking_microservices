import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserResponseData, IUserService } from './interfaces/user.service';
import { IUserRepository } from './interfaces/user.repository';
import { ResponseData } from 'src/lib/response-data';
import { User } from './entities/user.entity';
import { UserAlreadyExists, UserNotFound } from './exception/user.exception';
import { hash } from 'src/lib/bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    private jwtService: JwtService
  ) { }

  // CREATE
  async create(createUserDto: CreateUserDto): Promise<ResponseData<IUserResponseData>> {
    const foundUserByPhone = await this._findByPhone(createUserDto.phone)
    if (foundUserByPhone) {
      throw new UserAlreadyExists()
    }

    const newUser = new User()
    newUser.phone = createUserDto.phone;
    newUser.password = await hash(createUserDto.password);
    newUser.role = createUserDto.role;
    newUser.parkId = createUserDto.parkId;

    const createdUser = await this.userRepository.create(newUser);
    const token = await this.jwtService.signAsync({ id: createdUser.id })

    return new ResponseData<IUserResponseData>('create', 201, {
      user: createdUser,
      token
    })
  }

  // READ
  async findAll(): Promise<ResponseData<User[]>> {
    const users = await this.userRepository.findAll();
    return new ResponseData<Array<User>>('findAll', 200, users)
  }
  async findOne(id: number): Promise<ResponseData<User>> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new UserNotFound()
    }
    return new ResponseData<User>('findOne', 200, user)
  }
  async _findByPhone(phone: string): Promise<User> {
    return this.userRepository.findByPhone(phone)
  }

  // UPDATE
  async update(id: number, createUserDto: CreateUserDto): Promise<ResponseData<User>> {
    const { data: foundUser } = await this.findOne(id);
    const foundUserByPhone = await this._findByPhone(createUserDto.phone);
    if (foundUserByPhone && foundUser.id !== foundUserByPhone.id) {
      throw new UserAlreadyExists()
    }

    foundUser.phone = createUserDto.phone ? createUserDto.phone : foundUser.phone;
    foundUser.password = createUserDto.password ? await hash(createUserDto.password) : foundUser.password;
    foundUser.role = createUserDto.role ? createUserDto.role : foundUser.role;
    foundUser.parkId = createUserDto.parkId ? createUserDto.parkId : foundUser.parkId;

    const updatedUser = await this.userRepository.update(foundUser);
    return new ResponseData<User>('update', 200, updatedUser)
  }

  // DELETE
  async remove(id: number): Promise<ResponseData<User>> {
    await this.findOne(id);
    const deletedUser = await this.userRepository.remove(id);
    return new ResponseData<User>('delete', 200, deletedUser)
  }
}
