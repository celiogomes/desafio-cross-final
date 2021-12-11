import { Test, TestingModule } from '@nestjs/testing';
import { EtlController } from './etl.controller';
import { EtlService } from './etl.service';

describe('EtlController', () => {
  let controller: EtlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EtlController],
      providers: [EtlService],
    }).compile();

    controller = module.get<EtlController>(EtlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
