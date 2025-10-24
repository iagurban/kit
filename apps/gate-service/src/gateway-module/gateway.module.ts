import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RedisStaticModule } from '@poslah/util/ready-modules/redis-static-module';

import { GraphqlGatewayManager } from './graphql-gateway.manager';
import { RegistryConsumerService } from './registry-consumer.service';
import { RoutesProxyMiddleware } from './routes-proxy.middleware';

@Module({
  imports: [RedisStaticModule],
  providers: [RegistryConsumerService, GraphqlGatewayManager, RoutesProxyMiddleware],
})
export class GatewayModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RoutesProxyMiddleware).forRoutes('/api');
  }
}
