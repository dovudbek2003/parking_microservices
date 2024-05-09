import { Module } from '@nestjs/common';
import { FileModule } from './modules/file/file.module';

@Module({
  imports: [FileModule]
})
export class AppModule { }
