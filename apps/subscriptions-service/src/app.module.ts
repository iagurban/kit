import { Module } from '@nestjs/common';
import { chatsGRPCConfig } from '@poslah/chats-service/grpc/chats.grpc-config';
import { signingGRPCConfig } from '@poslah/signing-service/grpc/signing.grpc-config';
import { GraphqlSubgraphModule } from '@poslah/util/modules/graphql-subgraph/graphql-subgraph.module';
import { registerGRPCClientsModule } from '@poslah/util/modules/register-grpc-module';
import { AuthStaticModule } from '@poslah/util/ready-modules/auth-static-module';
import { GlobalDbModule } from '@poslah/util/ready-modules/global-db-module';
import { RedisStaticModule } from '@poslah/util/ready-modules/redis-static-module';
import { rootImports } from '@poslah/util/root-imports';

import buildInfo from './build-info.json';
import { SubscriptionsModule } from './subscriptions-module/subscriptions.module';

@Module({
  imports: [
    ...rootImports(`subscriptions-service`, `subscriptions`),
    GlobalDbModule,
    RedisStaticModule,
    AuthStaticModule,
    registerGRPCClientsModule([signingGRPCConfig, chatsGRPCConfig]),

    GraphqlSubgraphModule.forRootAsync(buildInfo.buildTime, { subscriptions: true }),

    SubscriptionsModule,
  ],
  controllers: [],
})
export class AppModule {}
