import { Module } from '@nestjs/common';
import { FilesModule } from './modules/files/files.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './common/config/database';

@Module({
  imports: [ TypeOrmModule.forRoot(typeormConfig), FilesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
