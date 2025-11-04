import { Module } from '@nestjs/common';
import { messagesGRPCConfig } from '@poslah/messages-service/grpc/messages.grpc-config';
import { signingGRPCConfig } from '@poslah/signing-service/grpc/signing.grpc-config';
import { CacheModule } from '@poslah/util/modules/cache/cache.module';
import { GraphqlSubgraphModule } from '@poslah/util/modules/graphql-subgraph/graphql-subgraph.module';
import { registerGRPCClientsModule } from '@poslah/util/modules/register-grpc-module';
import { AuthStaticModule } from '@poslah/util/ready-modules/auth-static-module';
import { GlobalDbModule } from '@poslah/util/ready-modules/global-db-module';
import { RedisStaticModule } from '@poslah/util/ready-modules/redis-static-module';
import { rootImports } from '@poslah/util/root-imports';

import buildInfo from './build-info.json';
import { ChatsModule } from './chats-module/chats.module';

@Module({
  imports: [
    ...rootImports(`chats-service`, `chats`),
    GlobalDbModule,
    RedisStaticModule,
    AuthStaticModule,

    registerGRPCClientsModule([signingGRPCConfig, messagesGRPCConfig]),

    GraphqlSubgraphModule.forRootAsync(buildInfo.buildTime),

    CacheModule,

    ChatsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
