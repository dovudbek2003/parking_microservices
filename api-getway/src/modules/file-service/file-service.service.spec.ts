import { Test, TestingModule } from '@nestjs/testing';
import { FileServiceService } from './file-service.service';

describe('FileServiceService', () => {
  let service: FileServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileServiceService],
    }).compile();

    service = module.get<FileServiceService>(FileServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
