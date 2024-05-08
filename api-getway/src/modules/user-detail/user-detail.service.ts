import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDetailDto } from './dto/create-user-detail.dto';
import { UpdateUserDetailDto } from './dto/update-user-detail.dto';
import { USER_PACKAGE } from 'src/common/const/servers';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class UserDetailService {
  private userDetailService: any;

  constructor(@Inject(USER_PACKAGE) private readonly userDetailClient: ClientGrpc) { }

  onModuleInit() {
    this.userDetailService = this.userDetailClient.getService<any>('UserDetailService');
  }
  create(createUserDetailDto: CreateUserDetailDto): Observable<string> {
    return this.userDetailService.create(createUserDetailDto);
  }

  findAll(): Observable<string> {
    return this.userDetailService.findAll({});
  }

  findOne(id: number): Observable<string> {
    return this.userDetailService.findOne({ id });;
  }

  update(updateUserDetailDto: UpdateUserDetailDto): Observable<string> {
    return this.userDetailService.update(updateUserDetailDto);
  }

  remove(id: number): Observable<string> {
    return this.userDetailService.remove({ id });
  }
}
