import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DbModule } from '@poslah/database/db/db.module';
import { RedisModule } from '@poslah/database/redis/redis.module';
import { RedisService, RedisSubscriptionService } from '@poslah/database/redis/redis.service';
import { ClientName } from '@poslah/util/client-name';
import { GraphqlSubgraphModule } from '@poslah/util/graphql-subgraph/graphql-subgraph.module';
import { rootImports } from '@poslah/util/root-imports';
import { join } from 'path';

import { ChatsModule } from './chats/chats.module';

const schemaPath = join(__dirname, 'schema.graphql');

console.log(`schema path: ${schemaPath}`);

@Module({
  imports: [
    ...rootImports,
    DbModule,
    GraphqlSubgraphModule.forRoot(`chats`, schemaPath),
    RedisModule.forRoot({
      default: {
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          host: config.getOrThrow<string>('REDIS_HOST', '0.0.0.0'),
          port: config.getOrThrow<number>('REDIS_PORT'),
        }),
        instance: RedisService,
      },
      subscription: {
        useConfig: `default`,
        instance: RedisSubscriptionService,
      },
    }),
    ChatsModule,
  ],
  controllers: [],
  providers: [ClientName],
})
export class AppModule {}
