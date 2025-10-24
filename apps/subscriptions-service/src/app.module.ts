import { Module } from '@nestjs/common';
import { chatsGRPCConfig } from '@poslah/chats-service/grpc/chats.grpc-config';
import { signingGRPCConfig } from '@poslah/signing-service/grpc/signing.grpc-config';
import { GraphqlSubgraphModule } from '@poslah/util/graphql-subgraph/graphql-subgraph.module';
import { AuthStaticModule } from '@poslah/util/ready-modules/auth-static-module';
import { GlobalDbModule } from '@poslah/util/ready-modules/global-db-module';
import { RedisStaticModule } from '@poslah/util/ready-modules/redis-static-module';
import { registerGRPCClientsModule } from '@poslah/util/register-grpc-module';
import { rootImports } from '@poslah/util/root-imports';
import { join } from 'path';

import buildInfo from './build-info.json';
import { SubscriptionsModule } from './subscriptions-module/subscriptions.module';

@Module({
  imports: [
    ...rootImports,
    GlobalDbModule,
    RedisStaticModule,
    AuthStaticModule,
    registerGRPCClientsModule([signingGRPCConfig, chatsGRPCConfig], join(__dirname, '../../certs')),

    GraphqlSubgraphModule.forRootAsync(
      `subscriptions`,
      join(__dirname, 'schema.graphql'),
      buildInfo.buildTime,
      RedisStaticModule,
      { subscriptions: true }
    ),

    SubscriptionsModule,
  ],
  controllers: [],
})
export class AppModule {}
