import { Module } from '@nestjs/common';
import { ChatsGRPCClient } from '@poslah/chats-service/grpc/chats.grpc-client';
import { TokenCheckerModule } from '@poslah/signing-service/token-checker-module/token-checker.module';
import { TokenFetcherModule } from '@poslah/signing-service/token-fetcher-module/token-fetcher.module';
import { RedisStaticModule } from '@poslah/util/ready-modules/redis-static-module';

import { SubscriptionsResolver } from './subscriptions.resolver';
import { SubscriptionsService } from './subscriptions.service';

@Module({
  imports: [TokenFetcherModule, TokenCheckerModule, RedisStaticModule],
  providers: [ChatsGRPCClient, SubscriptionsService, SubscriptionsResolver],
  exports: [SubscriptionsService],
})
export class SubscriptionsModule {}
