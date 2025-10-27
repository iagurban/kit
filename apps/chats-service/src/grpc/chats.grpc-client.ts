import { once } from '@gurban/kit/core/once';
import { createContextualLogger } from '@gurban/kit/interfaces/logger-interface';
import { Nullish } from '@gurban/kit/utils/types';
import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { TokenFetcherService } from '@poslah/signing-service/token-fetcher-module/token-fetcher.service';
import { GRPCClientBase } from '@poslah/util/grpc-client-base';
import { Logger } from '@poslah/util/modules/logger/logger.module';
import { protobufLongFromBigint, protobufLongToBigint } from '@poslah/util/protobuf/protobuf-long-to-bigint';
import { protobufTimestampToDate } from '@poslah/util/protobuf/protobuf-timestamp-to-date';
import { MessageEventDto } from '@poslah/util/schemas/some-message-event-schema';
import { firstValueFrom } from 'rxjs';

import { CHATS_SERVICE_NAME, ChatsServiceClient } from '../generated/grpc/src/grpc/chats';
import { chatsGRPCConfig } from './chats.grpc-config';

@Injectable()
export class ChatsGRPCClient extends GRPCClientBase<ChatsServiceClient> {
  constructor(
    private readonly loggerBase: Logger,
    @Inject(chatsGRPCConfig.clientName) grpcClient: ClientGrpc,
    private readonly tokenFetcher: TokenFetcherService
  ) {
    super(grpcClient, CHATS_SERVICE_NAME);
  }

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, ChatsGRPCClient.name);
  }

  async getLastMessageEvents(chatId: string, currentEventNn: bigint, targetMessageNn: bigint) {
    const { events, oldestCreatedAt } = await firstValueFrom(
      this.client.getLastMessageEvents(
        {
          chatId: chatId,
          messageNn: protobufLongFromBigint(targetMessageNn),
          afterNn: protobufLongFromBigint(currentEventNn),
        },
        await this.tokenFetcher.signedMetadata()
      )
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

  async getUserChatIds(userId: string) {
    const { chatIds } = await firstValueFrom(
      this.client.getUserChatIds({ userId }, await this.tokenFetcher.signedMetadata())
    );
    return new Set(chatIds);
  }
}
