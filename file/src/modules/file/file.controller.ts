import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, UploadedFile, UseInterceptors } from '@nestjs/common';
import { GrpcMethod, MessagePattern, Payload } from '@nestjs/microservices';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { fileOption } from '../../lib/file'
import path from 'path';

let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uplods/'),
  filename: (req, file, cb) => {
    console.log('1111111')
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName)
  },
})

let upload = multer({
  storage,
}).single('file')

@Controller()
export class FileController {
  constructor(private readonly fileService: FileService) { }


  @GrpcMethod('FileService', 'Create')
  create(
    // @UploadedFile(
    //   new ParseFilePipe({
    //     validators: [
    //       new MaxFileSizeValidator({ maxSize: 5242880 }),
    //       new FileTypeValidator({ fileType: 'image' }),
    //     ],
    //   }),
    // )
    createFileDto: CreateFileDto, req, res
  ) {
    console.log(1)
    upload
    console.log(2)
    console.log('createDto =>', createFileDto)
    return this.fileService.create(createFileDto);
  }

  @MessagePattern('findAllFile')
  findAll() {
    return this.fileService.findAll();
  }

  @MessagePattern('findOneFile')
  findOne(@Payload() id: number) {
    return this.fileService.findOne(id);
  }

  @MessagePattern('updateFile')
  update(@Payload() updateFileDto: UpdateFileDto) {
    return this.fileService.update(updateFileDto.id, updateFileDto);
  }

  @MessagePattern('removeFile')
  remove(@Payload() id: number) {
    return this.fileService.remove(id);
  }
}
