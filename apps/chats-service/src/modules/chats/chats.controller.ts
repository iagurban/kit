import { Metadata } from '@grpc/grpc-js';
import { once } from '@gurban/kit/core/once';
import { Controller } from '@nestjs/common';
import { TokenCheckerService } from '@poslah/signing-service/modules/token/token-checker.service';
import { createContextualLogger, Logger } from '@poslah/util/logger/logger.module';

import {
  CHATS_SERVICE_NAME,
  ChatsServiceController,
  ChatsServiceControllerMethods,
  GetLastMessageEventsRequest,
  GetLastMessageEventsResponse,
  GetUserChatIdsRequest,
  GetUserChatIdsResponse,
} from '../../generated/grpc/src/grpc/chats';
import { ChatsService } from './chats.service';

@Controller()
@ChatsServiceControllerMethods()
export class ChatsGRPCController implements ChatsServiceController {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly loggerBase: Logger,
    private readonly tokenChecker: TokenCheckerService
  ) {}

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, ChatsGRPCController.name);
  }

  async getLastMessageEvents(
    args: GetLastMessageEventsRequest,
    metadata: Metadata
  ): Promise<GetLastMessageEventsResponse> {
    await this.tokenChecker.assertAuthorization(metadata, CHATS_SERVICE_NAME, `GetLastMessageEvents`);

    return this.chatsService.getLastMessageEvents(args);
  }

  async getUserChatIds(request: GetUserChatIdsRequest, metadata: Metadata): Promise<GetUserChatIdsResponse> {
    await this.tokenChecker.assertAuthorization(metadata, CHATS_SERVICE_NAME, `GetUserChatIds`);

    return { chatIds: await this.chatsService.getUserChatIds(request.userId) };
  }
}
