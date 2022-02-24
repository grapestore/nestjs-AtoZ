import { Test, TestingModule } from '@nestjs/testing';
import { MoardService } from './moard.service';

describe('MoardService', () => {
  let service: MoardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoardService],
    }).compile();

    service = module.get<MoardService>(MoardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
