import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FILE_PACKAGE } from 'src/common/const/servers';
import { join } from 'path';
import { config } from 'src/common/config/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: FILE_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: 'file',
          protoPath: join(__dirname, '..', '..', '..', 'src', 'protos', 'file.proto'),
          url: `localhost:${config.filePort}`
        },
      },
    ]),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
