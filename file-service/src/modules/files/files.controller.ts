import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { FilesService } from './files.service';
import { FileEntity } from './entities/file.entity';
import {  IFileById } from './interfaces/controller.interface';
import { CreateFileDto } from './dto/file-controller.dto';
import { ResponseData } from 'src/lib/response-data';

@Controller()
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
  ) {}

  @GrpcMethod('FileService', 'Create')
  async create(data: CreateFileDto) {
    const createdFile = await this.filesService.create(data);
    return new ResponseData<FileEntity>("file created successfully", 200, createdFile);
  }
  @GrpcMethod('FileService', 'FindAll')
  async findAll({}) {
    const allAvailableFiles = await this.filesService.findAll();
    const repeated: { files: FileEntity[] } = { files: allAvailableFiles };
    const resData = new ResponseData<{ files: Array<FileEntity> }>("all available files", 200, repeated);
    return resData
  }
  @GrpcMethod('FileService', 'FindOneById')
  async findOne(data: IFileById) {
    const foundFile = await this.filesService.findOne(data.id);
    return new ResponseData<FileEntity>("found file", 200, foundFile);
  }
  @GrpcMethod('FileService', 'Delete')
  async delete(data: IFileById) {
    const foundFile = await this.filesService.findOne(data.id);
    const deletedFile = await this.filesService.remove(foundFile);
    return new ResponseData<FileEntity>("file deleted successfully", 200, deletedFile);
  }
}
