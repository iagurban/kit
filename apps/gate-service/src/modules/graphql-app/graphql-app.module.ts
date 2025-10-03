import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { DynamicModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

@Module({})
export class GraphqlAppModule {
  static forRoot(supergraphSdl: string): DynamicModule {
    return {
      module: GraphqlAppModule,
      imports: [
        GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
          driver: ApolloGatewayDriver,
          gateway: {
            supergraphSdl,
          },
          subscriptions: {
            'graphql-ws': {
              onConnect: context => {
                // ... your WebSocket authentication logic ...
              },
            },
          },
        }),
      ],
    };
  }
}
