import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PARK_PACKAGE, USER_PACKAGE } from 'src/common/const/servers';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable, lastValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  private userService: any;
  private parkService: any;

  constructor(
    @Inject(USER_PACKAGE) private userClient: ClientGrpc,
    @Inject(PARK_PACKAGE) private parkClient: ClientGrpc
  ) { }

  onModuleInit() {
    this.userService = this.userClient.getService<any>('UserService');
    this.parkService = this.parkClient.getService<any>('ParkService');
  }
  create(createUserDto: CreateUserDto): Observable<string> {
    // (async () => {
    //   console.log('parkId =>', createUserDto.parkId)
    //   const data = this.parkService.findOne({ id: createUserDto.parkId })
    //   console.log('bu data => ', await lastValueFrom(data))
    //   await lastValueFrom(data)
    // })()
    return this.userService.create(createUserDto);
  }

  findAll(): Observable<string> {
    return this.userService.findAll({});
  }

  findOne(id: number): Observable<string> {
    return this.userService.findOne({ id });;
  }

  update(updateUserDto: UpdateUserDto): Observable<string> {
    return this.userService.update(updateUserDto);
  }

  remove(id: number): Observable<string> {
    return this.userService.remove({ id });;
  }
}
