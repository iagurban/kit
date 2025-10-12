import { checked, isSomeObject, isString } from '@gurban/kit/core/checks';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import {
  BadRequestException,
  DynamicModule,
  Injectable,
  Module,
  OnApplicationShutdown,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthService } from '@poslah/util/auth-module/auth.service';
import { AuthStaticModule } from '@poslah/util/ready-modules/auth-static-module';
import { rootImports } from '@poslah/util/root-imports';
import { Context } from 'graphql-ws';
import { Operation, SubscriptionClient } from 'subscriptions-transport-ws';
import * as WebSocket from 'ws';

@Injectable()
class SubscriptionClientWrapper implements OnApplicationShutdown {
  constructor(private readonly configService: ConfigService) {}

  private _subscriptionClient: SubscriptionClient | undefined;

  get subscriptionClient() {
    return (this._subscriptionClient ??= new SubscriptionClient(
      this.configService.getOrThrow<string>('SUBSCRIPTIONS_SERVICE_WS_URL'),
      { reconnect: true },
      WebSocket
    ));
  }

  async onApplicationShutdown() {
    this._subscriptionClient?.close();
  }
}

@Module({
  providers: [SubscriptionClientWrapper],
  exports: [SubscriptionClientWrapper],
})
class SubscriptionClientWrapperModule {}

@Module({})
export class GraphqlAppModule {
  static forRoot(supergraphSdl: string): DynamicModule {
    return {
      module: GraphqlAppModule,
      imports: [
        ...rootImports,
        GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
          driver: ApolloGatewayDriver,
          imports: [AuthStaticModule, SubscriptionClientWrapperModule],
          inject: [ConfigService, AuthService, SubscriptionClientWrapper],
          useFactory: (
            configService: ConfigService,
            authService: AuthService,
            ssw: SubscriptionClientWrapper
          ) => ({
            gateway: {
              supergraphSdl,
            },
            subscriptions: {
              'graphql-ws': {
                // This is the auth hook for the CLIENT connecting to THIS gateway.
                onConnect: async (context: Context) => {
                  const { connectionParams, extra } = context;
                  if (!connectionParams || !isSomeObject(extra)) {
                    throw new BadRequestException('Connection parameters are missing or invalid.');
                  }
                  extra.user = await authService.validateToken(
                    checked(
                      connectionParams.authToken,
                      isString,
                      () => new BadRequestException('Auth token required.')
                    )
                  );
                  return true;
                },
              },
              'subscriptions-transport-ws': {
                forward: (operation: Operation) => ssw.subscriptionClient.request(operation),
              },
            },
            playground:
              configService.get('NODE_ENV') !== 'production'
                ? {
                    // The endpoint for queries/mutations, relative to the public gateway URL.
                    endpoint: '/graphql',
                    // The endpoint for WebSocket subscriptions, relative to the public gateway URL.
                    subscriptionEndpoint: '/graphql',
                  }
                : false, // Disable playground in production
          }),
        }),
      ],
    };
  }
}
