import { once } from '@gurban/kit/core/once';
import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { GRPCClientBase } from '@poslah/util/grpc-client-base';
import { createContextualLogger, Logger } from '@poslah/util/logger/logger.module';
import { protobufLongFromBigint } from '@poslah/util/protobuf-long-to-bigint';
import { protobufTimestampToDate } from '@poslah/util/protobuf-timestamp-to-date';
import { ProtobufToJS } from '@poslah/util/protobuf-to-js-type';
import { lastValueFrom } from 'rxjs';

import {
  GetMessageAuthInfoRequest,
  GetMessageAuthInfoResponse,
  MESSAGES_SERVICE_NAME,
  MessagesServiceClient,
} from '../generated/grpc/src/grpc/messages';
import { messagesGRPCConfig } from './messages.grpc-config';
import {Metadata} from "@grpc/grpc-js";

@Injectable()
export class MessagesGRPCClient extends GRPCClientBase<MessagesServiceClient> {
  constructor(
    private readonly loggerBase: Logger,
    @Inject(messagesGRPCConfig.clientName) grpcClient: ClientGrpc
  ) {
    super(grpcClient, MESSAGES_SERVICE_NAME);
  }

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, MessagesGRPCClient.name);
  }

  async getMessageAuthInfo(
    request: ProtobufToJS<GetMessageAuthInfoRequest>
  ): Promise<ProtobufToJS<GetMessageAuthInfoResponse>> {
    const o = await lastValueFrom(
      this.client.getMessageAuthInfo({ chatId: request.chatId, nn: protobufLongFromBigint(request.nn) }, new Metadata())
    );
    return {
      authorId: o.authorId,
      deletedAt: o.deletedAt ? protobufTimestampToDate(o.deletedAt) : undefined,
      createdAt: o.createdAt ? protobufTimestampToDate(o.createdAt) : undefined,
    };
  }
}
