import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { FastifyRequest } from 'fastify';
import { GraphQLError } from 'graphql';

import { NestImportable } from '../nest-types';
import { BigIntScalar } from './bigint.scalar';
import { SubgraphPublisher, subgraphPublisherOptionsToken } from './subgraph-publisher';

@Module({})
export class GraphqlSubgraphModule {
  static forRoot(serviceName: string, schemaPath: string, redisModule: NestImportable): DynamicModule {
    return {
      module: GraphqlSubgraphModule,
      imports: [
        redisModule,
        GraphQLModule.forRootAsync<ApolloFederationDriverConfig>({
          driver: ApolloFederationDriver,

          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
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
          }),
        }),
      ],
      providers: [
        { provide: subgraphPublisherOptionsToken, useValue: { serviceName, schemaPath } },
        SubgraphPublisher,
        BigIntScalar,
      ],
      exports: [BigIntScalar],
    };
  }
}
