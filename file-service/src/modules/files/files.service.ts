import { Inject, Injectable } from '@nestjs/common';
import { FileRepository } from './files.repository';
import { CreateFileDto } from './dto/file-controller.dto';
import { IFileRepository } from './interfaces/file.repo.interface';
import { FileEntity } from './entities/file.entity';
import { FileNotFoundException } from './exceptions/file.exceptions';

@Injectable()
export class FilesService {
  constructor(@Inject("IFileRepository") private readonly fileRepository: IFileRepository) {}
  async create(createFileDto: CreateFileDto):Promise<FileEntity> {
    const newFile = new FileEntity();
    newFile.url = createFileDto.url;
    newFile.mimetype = createFileDto.mimetype;
    newFile.size = createFileDto.size;
    const created = await this.fileRepository.createFile(newFile);
    return created;
  }

  async findAll():Promise<Array<FileEntity>> {
    const foundFiles = await this.fileRepository.getFiles();
    return foundFiles;
  }

  async findOne(id: number):Promise<FileEntity> {
    const foundFile = await this.fileRepository.getFile(id);
    if (!foundFile) {
      throw new FileNotFoundException();
    }
    return foundFile;
  }

  async remove(entity: FileEntity):Promise<FileEntity> {
    const deleteFile = await this.fileRepository.deleteFile(entity);
    return deleteFile;
  }
}
