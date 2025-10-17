import { writeFileSync } from 'node:fs';

import { RemoteGraphQLDataSource } from '@apollo/gateway';
import { GraphQLDataSourceProcessOptions } from '@apollo/gateway/src/datasources/types';
import { checked, isSomeObject, isString } from '@gurban/kit/core/checks';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import {
  BadRequestException,
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
import { EventEmitter } from 'events';
import { Client, Context, createClient, FormattedExecutionResult, SubscribeMessage } from 'graphql-ws';
import { IncomingHttpHeaders } from 'http';
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
      url: this.configService.getOrThrow<string>('SUBSCRIPTIONS_SERVICE_WS_URL'),
      webSocketImpl: WebSocket,
      connectionParams: {
        authToken,
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

                    // 2. Return the original header to be forwarded to the downstream service.
                    return { authorization };
                  }

                  // 3. If no token is present, check if the operation is on the public whitelist.
                  // Handles both POST (body) and GET (query) requests.
                  const operationName = req.body?.operationName ?? req.query?.operationName;
                  console.log('Operation name', operationName);

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
              subscriptions: {
                'graphql-ws': {
                  onConnect: (context: Context) => {
                    const { connectionParams, extra } = context;
                    if (!connectionParams || !isSomeObject(extra)) {
                      throw new BadRequestException('Connection parameters are missing or invalid.');
                    }
                    extra.authToken = checked(
                      connectionParams.authToken,
                      isString,
                      () => new BadRequestException('Auth token required.')
                    );
                    return true;
                  },
                  onSubscribe: (
                    context: Context,
                    message: SubscribeMessage
                  ): AsyncIterableIterator<FormattedExecutionResult<Record<string, unknown>, unknown>> => {
                    const client = subscriptionClientManager.createClient(
                      checked(
                        checked(context.extra, isSomeObject, () => `extra is noa an object`).authToken,
                        isString,
                        () => `authToken is not a string`
                      )
                    );

                    const emitter = new EventEmitter();
                    const changed = 'changed';

                    const state = {
                      queue: [] as FormattedExecutionResult<Record<string, unknown>, unknown>[],
                      error: null as unknown,
                      done: false,
                    };

                    const dispose = client.subscribe(message.payload, {
                      next: data => {
                        state.queue.push(data);
                        emitter.emit(changed);
                      },
                      error: err => {
                        state.error = err;
                        emitter.emit(changed);
                      },
                      complete: () => {
                        state.done = true;
                        emitter.emit(changed);
                      },
                    });

                    return {
                      async next(): Promise<
                        IteratorResult<FormattedExecutionResult<Record<string, unknown>, unknown>>
                      > {
                        if (state.error) {
                          throw state.error;
                        }
                        if (state.done && state.queue.length === 0) {
                          return { value: undefined, done: true };
                        }
                        if (state.queue.length > 0) {
                          return { value: state.queue.shift()!, done: false };
                        }
                        await new Promise(resolve => emitter.once(changed, resolve));
                        return this.next(); // Recurse to re-evaluate conditions
                      },
                      async return() {
                        dispose();
                        await subscriptionClientManager.removeClient(client);
                        return { value: undefined, done: true };
                      },
                      [Symbol.asyncIterator]() {
                        return this;
                      },
                    };
                  },
                },
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
