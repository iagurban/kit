import { Module } from '@nestjs/common';
import { ChatsGRPCClient } from '@poslah/chats-service/grpc/chats.grpc-client';
import { messageCreatedEventTopic } from '@poslah/chats-service/topics/message-created-event.topic';
import { messagePatchedEventTopic } from '@poslah/chats-service/topics/message-patched-event.topic';
import { TokenCheckerModule } from '@poslah/signing-service/token-checker-module/token-checker.module';
import { TokenFetcherModule } from '@poslah/signing-service/token-fetcher-module/token-fetcher.module';
import { RedisStreamConsumerModule } from '@poslah/util/nosql/redis/redis-stream-consumer.module';
import { ScyllaModule } from '@poslah/util/nosql/scylla/scylla.module';
import { RedisStaticModule } from '@poslah/util/ready-modules/redis-static-module';

import { MessagesController } from './messages.controller';
import { MessagesResolver } from './messages.resolver';
import { MessagesService } from './messages.service';
import { MessagesDb } from './messages-db';
import { MessagesGrpcController } from './messages-grpc.controller';

const consumersGroup = 'messages-service';

@Module({
  imports: [
    RedisStaticModule,
    ScyllaModule,
    RedisStreamConsumerModule.forRoot(
      {
        [messageCreatedEventTopic.name]: consumersGroup,
        [messagePatchedEventTopic.name]: consumersGroup,
      },
      RedisStaticModule
    ),
    TokenFetcherModule,
    TokenCheckerModule,
  ],
  controllers: [MessagesController, MessagesGrpcController],
  providers: [MessagesDb, ChatsGRPCClient, MessagesService, MessagesResolver],
})
export class MessagesModule {}
