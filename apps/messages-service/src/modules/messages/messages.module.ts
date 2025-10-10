import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { messagePatchedEventTopic } from '@poslah/chats-service/modules/chats/topic/message-patched-event.topic';
import { DbModule } from '@poslah/database/db/db.module';
import { RedisFabric } from '@poslah/database/redis/redis-client.factory';
import { RedisStreamConsumer } from '@poslah/database/redis/redis-sream.consumer';
import { RedisStreamConsumerModule } from '@poslah/database/redis/redis-stream-consumer.module';
import { ClientName } from '@poslah/util/client-name';
import { LoggerModule } from '@poslah/util/logger/logger.module';

import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { MessagesDb } from './messages-db';
import { MessagesGrpcController } from './messages-grpc.controller';

const RENDER_STREAM_NAME = 'post-render-requests';
const DEFAULT_REDIS_FABRIC = 'DEFAULT_REDIS_FABRIC';

const consumersGroup = `messages-service-group`;

@Module({
  imports: [LoggerModule, ClientsModule, DbModule, RedisStreamConsumerModule],
  controllers: [MessagesController, MessagesGrpcController],
  providers: [
    MessagesService,
    MessagesDb,
    ClientName,

    RedisFabric.provideDefault(DEFAULT_REDIS_FABRIC),

    {
      provide: RedisFabric,
      useExisting: DEFAULT_REDIS_FABRIC,
    },

    // RedisService.autoconnectionProvider(),
    // RedisSubscriptionService.autoconnectionProvider(),

    RedisStreamConsumer.provide(messagePatchedEventTopic.name, {
      inject: [ClientName, DEFAULT_REDIS_FABRIC],
      useFactory: ({ clientName: consumerName }: ClientName, redisFabric: RedisFabric) => ({
        redisFabric,
        consumerName,
        consumersGroup,
      }),
    }),
  ],
})
export class MessagesModule {}
