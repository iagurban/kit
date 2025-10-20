import { writeFileSync } from 'node:fs';
import { IncomingHttpHeaders } from 'node:http';

import { RemoteGraphQLDataSource } from '@apollo/gateway';
import { GraphQLDataSourceProcessOptions } from '@apollo/gateway/src/datasources/types';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import {
  DynamicModule,
  Injectable,
  Module,
  OnApplicationShutdown,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLException } from '@nestjs/graphql/dist/exceptions/index';
import { AuthService } from '@poslah/util/auth-module/auth.service';
import { AuthStaticModule } from '@poslah/util/ready-modules/auth-static-module';
import { rootImports } from '@poslah/util/root-imports';
import { Client, createClient } from 'graphql-ws';
import { join } from 'path';
import * as WebSocket from 'ws';

const publicGraphqlOperationsSet = new Set([
  // An explicit list of operations that are public and do not require authentication.
  'IntrospectionQuery',
]);

@Injectable()
class SubscriptionClientManager implements OnApplicationShutdown {
  private readonly clients = new Set<Client>();

  constructor(private readonly configService: ConfigService) {}

  createClient(authToken: string): Client {
    const client = createClient({
      url: `${this.configService.getOrThrow<string>('SUBSCRIPTIONS_SERVICE_WS_URL')}/graphql`,
      webSocketImpl: WebSocket,
      connectionParams: {
        authToken,
      },
      on: {
        opened: socket => {
          console.log(socket);
        },
      },
    });
    this.clients.add(client);
    return client;
  }

  async removeClient(client: Client) {
    if (this.clients.has(client)) {
      await client.dispose();
      this.clients.delete(client); // maybe shutdown will happen while disposing
    }
  }

  async onApplicationShutdown() {
    await Promise.all([...this.clients].map(client => client.dispose()));
  }
}

@Module({
  providers: [SubscriptionClientManager],
  exports: [SubscriptionClientManager],
})
class SubscriptionClientManagerModule {}

const writeSdlToFile = (path: string, sdl: string) => {
  console.log(`writing sdl to ${path}`);
  writeFileSync(path, sdl);
};

@Module({})
export class GraphqlAppModule {
  static forRoot(supergraphSdl: string): DynamicModule {
    writeSdlToFile(join(process.cwd(), '../../schema.graphql'), supergraphSdl);

    return {
      module: GraphqlAppModule,
      imports: [
        ...rootImports,
        GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
          driver: ApolloGatewayDriver,
          imports: [SubscriptionClientManagerModule, AuthStaticModule],
          inject: [ConfigService, AuthService, SubscriptionClientManager],
          useFactory: (
            configService: ConfigService,
            authService: AuthService,
            subscriptionClientManager: SubscriptionClientManager
          ) => ({
            gateway: {
              supergraphSdl,
              buildService({ url }) {
                return new (class extends RemoteGraphQLDataSource {
                  override willSendRequest({
                    request,
                    context,
                  }: GraphQLDataSourceProcessOptions<{ authorization?: string }>) {
                    if (context.authorization) {
                      request.http?.headers.set('authorization', context.authorization);
                    }
                  }
                })({ url });
              },
            },
            server: {
              context: async (req: {
                headers: IncomingHttpHeaders;
                body?: { operationName?: string };
                query?: { operationName?: string };
              }) => {
                console.log(`context`);
                try {
                  if (configService.get('NODE_ENV') !== 'production') {
                    const devUserHeader = req.headers?.['x-dev-user'];
                    if (devUserHeader) {
                      req.headers.authorization = `x-dev-user-${devUserHeader}`;
                    }
                  }
                  const { authorization } = req.headers;

                  if (authorization) {
                    // 1. If a token is present, validate it. This protects downstream services.
                    // An exception is thrown on failure, blocking the request.
                    await authService.validateToken(authorization);

                    console.log(`authenticated`);
                    // 2. Return the original header to be forwarded to the downstream service.
                    return { authorization };
                  }

                  // 3. If no token is present, check if the operation is on the public whitelist.
                  // Handles both POST (body) and GET (query) requests.
                  const operationName = req.body?.operationName ?? req.query?.operationName;
                  console.log('Operation name', req.body);

                  if (!operationName || !publicGraphqlOperationsSet.has(operationName)) {
                    // 4. If it's not a known public operation, reject the request.
                    throw new UnauthorizedException('This operation requires authentication.');
                  }

                  // 5. The operation is public, so allow it to proceed without any auth context.
                  return {};
                } catch (e) {
                  throw new GraphQLException(e instanceof Error ? e.message : String(e), {
                    extensions: { code: 'UNAUTHENTICATED', http: { status: 401 } },
                    originalError: e instanceof Error ? e : new Error(String(e)),
                  });
                }
              },

              playground:
                configService.get('NODE_ENV') !== 'production'
                  ? {
                      endpoint: '/graphql',
                      subscriptionEndpoint: '/graphql',
                    }
                  : false,
            },
          }),
        }),
      ],
    };
  }
}
