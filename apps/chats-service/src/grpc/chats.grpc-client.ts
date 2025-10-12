import { once } from '@gurban/kit/core/once';
import { Nullish } from '@gurban/kit/utils/types';
import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { GRPCClientBase } from '@poslah/util/grpc-client-base';
import { createContextualLogger, Logger } from '@poslah/util/logger/logger.module';
import { protobufLongFromBigint, protobufLongToBigint } from '@poslah/util/protobuf-long-to-bigint';
import { protobufTimestampToDate } from '@poslah/util/protobuf-timestamp-to-date';
import { firstValueFrom } from 'rxjs';

import { MessageEventDto } from '../entities/raw-event-schema';
import { CHATS_SERVICE_NAME, ChatsServiceClient } from '../generated/grpc/src/grpc/chats';
import { chatsGRPCConfig } from './chats.grpc-config';

@Injectable()
export class ChatsGRPCClient extends GRPCClientBase<ChatsServiceClient> {
  constructor(
    private readonly loggerBase: Logger,
    @Inject(chatsGRPCConfig.clientName) grpcClient: ClientGrpc
  ) {
    super(grpcClient, CHATS_SERVICE_NAME);
  }

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, ChatsGRPCClient.name);
  }

  async getLastMessageEvents(chatId: string, currentEventNn: bigint, targetMessageNn: bigint) {
    const { events, oldestCreatedAt } = await firstValueFrom(
      this.client.getLastMessageEvents({
        chatId: chatId,
        messageNn: protobufLongFromBigint(targetMessageNn),
        afterNn: protobufLongFromBigint(currentEventNn),
      })
    );
    return {
      events: events.map(
        e =>
          ({
            nn: protobufLongToBigint(e.nn),
            payload: e.payload as Exclude<MessageEventDto[`payload`], Nullish>,
          }) as const
      ),
      oldestCreatedAt: oldestCreatedAt ? protobufTimestampToDate(oldestCreatedAt) : undefined,
    };
  }
}
