import { once } from '@gurban/kit/core/once';
import { Controller } from '@nestjs/common';
import { createContextualLogger, Logger } from '@poslah/util/logger/logger.module';

import {
  ChatsServiceController,
  ChatsServiceControllerMethods,
  GetLastMessageEventsRequest,
  GetLastMessageEventsResponse,
} from '../../generated/grpc/src/grpc/chats';
import { ChatsService } from './chats.service';

@Controller()
@ChatsServiceControllerMethods()
export class ChatsController implements ChatsServiceController {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly loggerBase: Logger
  ) {}

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, ChatsController.name);
  }

  // gRPC method
  getLastMessageEvents(args: GetLastMessageEventsRequest): Promise<GetLastMessageEventsResponse> {
    return this.chatsService.getLastMessageEvents(args);
  }
}
