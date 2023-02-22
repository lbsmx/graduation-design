import { Test, TestingModule } from '@nestjs/testing';
import { MytestController } from './mytest.controller';
import { MytestService } from './mytest.service';

describe('MytestController', () => {
  let controller: MytestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MytestController],
      providers: [MytestService],
    }).compile();

    controller = module.get<MytestController>(MytestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
