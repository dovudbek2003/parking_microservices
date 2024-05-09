import { Inject, Injectable } from '@nestjs/common';
import { CreateFileServiceDto } from './dto/create-file-service.dto';
import { FILE_PACKAGE } from 'src/common/const/servers';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class FileServiceService {
  private fileService: any;

  constructor(
    @Inject(FILE_PACKAGE) private fileClient: ClientGrpc,
  ) { }

  onModuleInit() {
    this.fileService = this.fileClient.getService<any>('FileService');
  }

  async create(createFileServiceDto: CreateFileServiceDto) {
    return this.fileService.create(createFileServiceDto);
  }

  async findAll() {
    return `This action returns all fileService`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} fileService`;
  }

  async remove(id: number) {
    return `This action removes a #${id} fileService`;
  }
}
