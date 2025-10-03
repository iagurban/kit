import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { RegistryConsumerService } from '../../registry-consumer.service';
import { GraphqlGatewayManager } from './graphql-gateway.manager';
import { GraphQLProxyMiddleware } from './graphql-proxy.middleware';
import { RoutesProxyMiddleware } from './routes-proxy.middleware';

@Module({
  providers: [RegistryConsumerService, GraphqlGatewayManager, RoutesProxyMiddleware, GraphQLProxyMiddleware],
})
export class GatewayModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RoutesProxyMiddleware).forRoutes('/api');
    consumer.apply(GraphQLProxyMiddleware).forRoutes('/graphql');
  }
}
