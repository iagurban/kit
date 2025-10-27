import { Test, TestingModule } from '@nestjs/testing';

import { MessagesStreamsController } from './messages.streams-controller';

describe('MessagesController', () => {
  let controller: MessagesStreamsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessagesStreamsController],
    }).compile();

    controller = module.get<MessagesStreamsController>(MessagesStreamsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
