import { Test, TestingModule } from '@nestjs/testing';

import { ChatsGRPCController } from './chats.controller';

describe('ChatsController', () => {
  let controller: ChatsGRPCController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatsGRPCController],
    }).compile();

    controller = module.get<ChatsGRPCController>(ChatsGRPCController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
