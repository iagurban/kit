import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RedisStaticModule } from '@poslah/util/ready-modules/redis-static-module';

import { RegistryConsumerService } from '../registry-consumer.service';
import { GraphqlGatewayManager } from './graphql-gateway.manager';
import { GraphQLProxyMiddleware } from './graphql-proxy.middleware';
import { RoutesProxyMiddleware } from './routes-proxy.middleware';

@Module({
  imports: [RedisStaticModule],
  providers: [RegistryConsumerService, GraphqlGatewayManager, RoutesProxyMiddleware, GraphQLProxyMiddleware],
})
export class GatewayModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GraphQLProxyMiddleware).forRoutes('/graphql');
    consumer.apply(RoutesProxyMiddleware).forRoutes('/api');
  }
}
