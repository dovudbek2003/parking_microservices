import { Test, TestingModule } from '@nestjs/testing';
import { FileServiceController } from './file-service.controller';
import { FileServiceService } from './file-service.service';

describe('FileServiceController', () => {
  let controller: FileServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileServiceController],
      providers: [FileServiceService],
    }).compile();

    controller = module.get<FileServiceController>(FileServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
