import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { FileServiceService } from './file-service.service';
import { CreateFileServiceDto } from './dto/create-file-service.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileOption } from 'src/lib/file';

@ApiTags('files')
@Controller('file-service')
export class FileServiceController {
  constructor(private readonly fileServiceService: FileServiceService) { }
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @UseInterceptors(FileInterceptor('file', fileOption))
  create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5242880 }),
          new FileTypeValidator({ fileType: 'image' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() createFileServiceDto: CreateFileServiceDto) {
    const fileDto = createFileServiceDto;
    fileDto.url = file.destination;
    fileDto.size = file.size;
    fileDto.mimetype = file.mimetype;
    return this.fileServiceService.create(fileDto);
  }

  @Get()
  findAll() {
    return this.fileServiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileServiceService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileServiceService.remove(+id);
  }
}
