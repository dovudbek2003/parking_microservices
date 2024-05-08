import { Module } from '@nestjs/common';
import { UserDetailService } from './user-detail.service';
import { UserDetailController } from './user-detail.controller';
import { UserDetailRepository } from './user-detail.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDetail } from './entities/user-detail.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserDetail]),
    UserModule
  ],
  controllers: [UserDetailController],
  providers: [
    { provide: 'IUserDetailService', useClass: UserDetailService },
    { provide: 'IUserDetailRepository', useClass: UserDetailRepository },
  ],
})
export class UserDetailModule { }
