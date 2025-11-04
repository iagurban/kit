import { checked, isNullish, isSomeObject, isSomeOf } from '@gurban/kit/core/checks';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { FastifyRequest } from 'fastify';
import { GraphQLError } from 'graphql';
import { Context } from 'graphql-ws';
import { join } from 'path';
import { z } from 'zod/v4';

import { AuthStaticModule } from '../../ready-modules/auth-static-module';
import { RedisStaticModule } from '../../ready-modules/redis-static-module';
import { AuthService } from '../auth-module/auth.service';
import { CacheModule } from '../cache/cache.module';
import { PubSubModule } from '../pubsub/pubsub.module';
import { BigIntScalar } from './bigint.scalar';
import {
  SubgraphPublisher,
  SubgraphPublisherOptions,
  subgraphPublisherOptionsToken,
} from './subgraph-publisher';

const authHeadersSchema = z.object({
  authorization: z.string().optional().nullable(),
  'x-dev-user': z.string().optional().nullable(),
});

@Module({})
export class GraphqlSubgraphModule {
  static forRootAsync(version: number, options: { subscriptions?: boolean } = {}): DynamicModule {
    const schemaPath = join(process.cwd(), 'schema.graphql');

    return {
      module: GraphqlSubgraphModule,
      imports: [
        RedisStaticModule,
        PubSubModule,
        CacheModule,
        GraphQLModule.forRootAsync<ApolloFederationDriverConfig>({
          driver: ApolloFederationDriver,

          imports: [AuthStaticModule],
          inject: [ConfigService, AuthService],
          useFactory: (
            configService: ConfigService,
            authService: AuthService
          ): ApolloFederationDriverConfig => {
            const authorize = async (headers: z.infer<typeof authHeadersSchema>) => {
              const devUserHeader = configService.get('NODE_ENV') !== 'production' && headers['x-dev-user'];
              const authorizationHeader = devUserHeader
                ? `x-dev-user-${devUserHeader}`
                : headers['authorization'];
              return authorizationHeader ? authService.validateToken(authorizationHeader) : null;
            };

            return {
              driver: ApolloFederationDriver,
              /** TypeScript decorators. This is essential for the schema registry. */
              autoSchemaFile: {
                path: schemaPath,
                federation: 2, // Explicitly use Apollo Federation v2
              },

              sortSchema: true,

              /** Creates a context object for each request. This is how your resolvers
               *  get access to request headers and the authenticated user.
               */
              context: async (req: FastifyRequest | Context) => {
                const isContext = (o: FastifyRequest | Context): o is Context => 'connectionParams' in o;

                if (isContext(req)) {
                  // subscription (websocket, goes from onConnect)
                  const { extra } = req;

                  return {
                    req: {
                      user: checked(
                        checked(extra, isSomeObject, () => `extra is not an object`).user,
                        isSomeOf(isSomeObject, isNullish),
                        () => `user is not passed to extra at onConnect`
                      ),
                    },
                  };
                }

                // query/mutation (HTTP)
                return { user: await authorize(authHeadersSchema.parse(req.headers)) };
              },

              formatError: (formattedError, error) => {
                const originalError = ((error as GraphQLError)?.originalError || error) as
                  | { constructor?: { name: string }; stack?: string }
                  | undefined;

                return {
                  ...formattedError,
                  extensions: {
                    errorClass: originalError?.constructor?.name,
                    debugStacktrace:
                      configService.get('NODE_ENV') !== 'production'
                        ? originalError?.stack?.split('\n').map(s => s.trim())
                        : undefined,
                    ...formattedError.extensions,
                  },
                };
              },

              playground: configService.get('NODE_ENV') !== 'production',

              subscriptions: options.subscriptions
                ? {
                    'graphql-ws': {
                      onConnect: async (context: Context) => {
                        const { connectionParams, extra } = context;

                        const incomingHeaders = connectionParams
                          ? authHeadersSchema.parse(connectionParams.headers)
                          : {};

                        checked(extra, isSomeObject, () => `extra is not an object`).user =
                          await authorize(incomingHeaders);

                        return true;
                      },
                    },
                  }
                : undefined,
            } as ApolloFederationDriverConfig;
          },
        }),
      ],
      providers: [
        {
          provide: subgraphPublisherOptionsToken,
          useValue: { schemaPath, version } satisfies SubgraphPublisherOptions,
        },
        SubgraphPublisher,
        BigIntScalar,
      ],
      exports: [BigIntScalar],
    };
  }
}
