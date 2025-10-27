import { Module } from '@nestjs/common';
import { ChatsGRPCClient } from '@poslah/chats-service/grpc/chats.grpc-client';
import { eventsMessageCreatedTopic } from '@poslah/chats-service/topics/events-message-created-topic';
import { eventsMessagePatchedTopic } from '@poslah/chats-service/topics/events-message-patched-topic';
import { TokenCheckerModule } from '@poslah/signing-service/token-checker-module/token-checker.module';
import { TokenFetcherModule } from '@poslah/signing-service/token-fetcher-module/token-fetcher.module';
import { RedisStreamConsumerModule } from '@poslah/util/modules/nosql/redis/stream-consumer-module/redis-stream-consumer.module';
import { ScyllaModule } from '@poslah/util/modules/nosql/scylla/scylla.module';
import { RedisStaticModule } from '@poslah/util/ready-modules/redis-static-module';

import { MessagesRepository } from './messages.repository';
import { MessagesResolver } from './messages.resolver';
import { MessagesService } from './messages.service';
import { MessagesStreamsController } from './messages.streams-controller';
import { MessagesGrpcController } from './messages-grpc.controller';

@Module({
  imports: [
    RedisStaticModule,
    ScyllaModule,
    RedisStreamConsumerModule.forRoot(
      [eventsMessageCreatedTopic.name, eventsMessagePatchedTopic.name],
      RedisStaticModule
    ),
    TokenFetcherModule,
    TokenCheckerModule,
  ],
  controllers: [MessagesStreamsController, MessagesGrpcController],
  providers: [MessagesRepository, ChatsGRPCClient, MessagesService, MessagesResolver],
})
export class MessagesModule {}
