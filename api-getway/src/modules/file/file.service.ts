import { Inject, Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FILE_PACKAGE } from 'src/common/const/servers';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class FileService {
  private fileService: any;

  constructor(
    @Inject(FILE_PACKAGE) private fileClient: ClientGrpc,
  ) { }

  onModuleInit() {
    this.fileService = this.fileClient.getService<any>('FileService');
  }

  async create(createFileDto: CreateFileDto) {
    return this.fileService.create(createFileDto);
  }

  async findAll() {
    return `This action returns all file`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  async update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  async remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
