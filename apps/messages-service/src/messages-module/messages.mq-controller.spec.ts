import { Test, TestingModule } from '@nestjs/testing';

import { MessagesMqController } from './messages.mq-controller';

describe('MessagesController', () => {
  let controller: MessagesMqController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessagesMqController],
    }).compile();

    controller = module.get<MessagesMqController>(MessagesMqController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
