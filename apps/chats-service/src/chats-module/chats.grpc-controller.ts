import { once } from '@gurban/kit/core/once';
import { createContextualLogger } from '@gurban/kit/interfaces/logger-interface';
import { Controller } from '@nestjs/common';
import { TokenCheckerService } from '@poslah/signing-service/token-checker-module/token-checker.service';
import { Logger } from '@poslah/util/modules/logger/logger.module';
import { protobufLongFromBigint, protobufLongToBigint } from '@poslah/util/protobuf/protobuf-long-to-bigint';
import { protobufTimestampFromDate } from '@poslah/util/protobuf/protobuf-timestamp-to-date';

import {
  ChatsServiceController,
  ChatsServiceControllerMethods,
  GetLastMessageEventsRequest,
  GetLastMessageEventsResponse,
  GetUserChatIdsRequest,
  GetUserChatIdsResponse,
} from '../generated/grpc/src/grpc/chats';
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

  async getLastMessageEvents(args: GetLastMessageEventsRequest): Promise<GetLastMessageEventsResponse> {
    const result = await this.chatsService.getLastMessageEvents({
      chatId: args.chatId,
      messageNn: protobufLongToBigint(args.messageNn),
      afterNn: protobufLongToBigint(args.afterNn),
    });

    return {
      oldestCreatedAt: (date => (date ? protobufTimestampFromDate(date) : undefined))(result.oldestCreatedAt),
      events: result.events.map(({ nn, payload }) => ({
        nn: protobufLongFromBigint(nn),
        payload,
      })),
    };
  }

  async getUserChatIds(request: GetUserChatIdsRequest): Promise<GetUserChatIdsResponse> {
    return { chatIds: await this.chatsService.getUserChatIds(request.userId) };
  }
}
