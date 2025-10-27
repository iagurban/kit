import { once } from '@gurban/kit/core/once';
import { createContextualLogger } from '@gurban/kit/interfaces/logger-interface';
import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { TokenFetcherService } from '@poslah/signing-service/token-fetcher-module/token-fetcher.service';
import { GRPCClientBase } from '@poslah/util/grpc-client-base';
import { Logger } from '@poslah/util/modules/logger/logger.module';
import { protobufLongFromBigint } from '@poslah/util/protobuf/protobuf-long-to-bigint';
import { protobufTimestampToDate } from '@poslah/util/protobuf/protobuf-timestamp-to-date';
import { ProtobufToJS } from '@poslah/util/protobuf/protobuf-to-js-type';
import { lastValueFrom } from 'rxjs';

import {
  GetMessageAuthInfoRequest,
  GetMessageAuthInfoResponse,
  MESSAGES_SERVICE_NAME,
  MessagesServiceClient,
} from '../generated/grpc/src/grpc/messages';
import { messagesGRPCConfig } from './messages.grpc-config';

@Injectable()
export class MessagesGRPCClient extends GRPCClientBase<MessagesServiceClient> {
  constructor(
    private readonly loggerBase: Logger,
    @Inject(messagesGRPCConfig.clientName) grpcClient: ClientGrpc,
    private readonly tokenFetcher: TokenFetcherService
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
    const { authorId, deletedAt, createdAt } = await lastValueFrom(
      this.client.getMessageAuthInfo(
        { chatId: request.chatId, nn: protobufLongFromBigint(request.nn) },
        await this.tokenFetcher.signedMetadata()
      )
    );
    return {
      authorId: authorId,
      deletedAt: deletedAt ? protobufTimestampToDate(deletedAt) : undefined,
      createdAt: createdAt ? protobufTimestampToDate(createdAt) : undefined,
    };
  }
}
