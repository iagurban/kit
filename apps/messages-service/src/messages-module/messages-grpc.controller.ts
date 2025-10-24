import { Metadata } from '@grpc/grpc-js';
import { Controller, NotFoundException } from '@nestjs/common';
import { TokenCheckerService } from '@poslah/signing-service/token-checker-module/token-checker.service';
import { protobufLongToBigint } from '@poslah/util/protobuf-long-to-bigint';
import { protobufTimestampFromDate } from '@poslah/util/protobuf-timestamp-to-date';

import {
  GetMessageAuthInfoRequest,
  GetMessageAuthInfoResponse,
  MESSAGES_SERVICE_NAME,
  MessagesServiceController,
  MessagesServiceControllerMethods,
} from '../generated/grpc/src/grpc/messages';
import { MessagesDb } from './messages-db';

@Controller()
@MessagesServiceControllerMethods()
export class MessagesGrpcController implements MessagesServiceController {
  constructor(
    private readonly messagesDb: MessagesDb,
    private readonly tokenChecker: TokenCheckerService
  ) {}

  async getMessageAuthInfo(
    request: GetMessageAuthInfoRequest,
    metadata: Metadata
  ): Promise<GetMessageAuthInfoResponse> {
    await this.tokenChecker.assertAuthorization(metadata, MESSAGES_SERVICE_NAME, `getMessageAuthInfo`);

    const messageInfo = await this.messagesDb.get(request.chatId, protobufLongToBigint(request.nn), {
      authorId: true,
      createdAt: true,
      deletedAt: true,
    });

    if (!messageInfo) {
      // Throw a gRPC NOT_FOUND error
      throw new NotFoundException(`Message ${request.nn} in chat ${request.chatId} not found.`);
    }

    return {
      authorId: messageInfo.authorId,
      createdAt: protobufTimestampFromDate(messageInfo.createdAt),
      deletedAt: messageInfo.deletedAt ? protobufTimestampFromDate(messageInfo.deletedAt) : undefined,
    };
  }
}
