import { Controller, NotFoundException } from '@nestjs/common';
import { protobufLongToBigint } from '@poslah/util/protobuf/protobuf-long-to-bigint';
import { protobufTimestampFromDate } from '@poslah/util/protobuf/protobuf-timestamp-to-date';

import {
  GetMessageAuthInfoRequest,
  GetMessageAuthInfoResponse,
  MessagesServiceController,
  MessagesServiceControllerMethods,
} from '../generated/grpc/src/grpc/messages';
import { MessagesRepository } from './messages.repository';

@Controller()
@MessagesServiceControllerMethods()
export class MessagesGrpcController implements MessagesServiceController {
  constructor(private readonly messagesDb: MessagesRepository) {}

  async getMessageAuthInfo(request: GetMessageAuthInfoRequest): Promise<GetMessageAuthInfoResponse> {
    const [messageInfo] = await this.messagesDb.getById(request.chatId, [protobufLongToBigint(request.nn)], {
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
