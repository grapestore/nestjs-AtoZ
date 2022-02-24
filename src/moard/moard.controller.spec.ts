import { Test, TestingModule } from '@nestjs/testing';
import { MoardController } from './moard.controller';

describe('MoardController', () => {
  let controller: MoardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoardController],
    }).compile();

    controller = module.get<MoardController>(MoardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
