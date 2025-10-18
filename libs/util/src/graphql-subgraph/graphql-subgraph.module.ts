import { checked, isSomeObject, isString } from '@gurban/kit/core/checks';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { FastifyRequest } from 'fastify';
import { GraphQLError } from 'graphql';
import { Context } from 'graphql-ws';

import { NestImportable } from '../nest-types';
import { BigIntScalar } from './bigint.scalar';
import {
  SubgraphPublisher,
  SubgraphPublisherOptions,
  subgraphPublisherOptionsToken,
} from './subgraph-publisher';

@Module({})
export class GraphqlSubgraphModule {
  static forRootAsync(
    serviceName: string,
    schemaPath: string,
    version: number,
    redisModule: NestImportable,
    options: { subscriptions?: boolean } = {}
  ): DynamicModule {
    return {
      module: GraphqlSubgraphModule,
      imports: [
        redisModule,
        GraphQLModule.forRootAsync<ApolloFederationDriverConfig>({
          driver: ApolloFederationDriver,

          inject: [ConfigService],
          useFactory: (configService: ConfigService) =>
            ({
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
              context: (req: FastifyRequest) => {
                // query/mutation
                if (configService.get('NODE_ENV') !== 'production') {
                  const devUserHeader = req.headers['x-dev-user'];
                  if (devUserHeader) {
                    req.headers.authorization = `x-dev-user-${devUserHeader}`;
                  }
                }
                return { req };
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
                      onConnect: (context: Context) => {
                        const { connectionParams } = context;

                        const incomingHeaders = checked(
                          connectionParams?.headers,
                          isSomeObject,
                          () => `headers is not an object`
                        );

                        const devUserHeader =
                          configService.get('NODE_ENV') !== 'production' &&
                          checked(
                            incomingHeaders['x-dev-user'],
                            isString,
                            () => `x-dev-user header is not a string`
                          );

                        const headers = {
                          authorization: devUserHeader
                            ? `x-dev-user-${devUserHeader}`
                            : checked(
                                incomingHeaders[`authorization`],
                                isString,
                                () => `authorization header is not a string`
                              ),
                        } as const;

                        return { req: { headers } };
                      },
                    },
                  }
                : undefined,
            }) as ApolloFederationDriverConfig,
        }),
      ],
      providers: [
        {
          provide: subgraphPublisherOptionsToken,
          useValue: { serviceName, schemaPath, version } satisfies SubgraphPublisherOptions,
        },
        SubgraphPublisher,
        BigIntScalar,
      ],
      exports: [BigIntScalar],
    };
  }
}
