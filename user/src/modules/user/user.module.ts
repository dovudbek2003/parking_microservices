import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'src/common/config/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: config.jwtSecretKey,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [UserController],
  providers: [
    { provide: 'IUserService', useClass: UserService },
    { provide: 'IUserRepository', useClass: UserRepository },
  ],
  exports: [
    { provide: 'IUserService', useClass: UserService },
    { provide: 'IUserRepository', useClass: UserRepository }
  ]
})
export class UserModule { }
