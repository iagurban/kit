import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { FastifyRequest } from 'fastify';

import { NestImportable } from '../nest-types';
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
            context: ({ req }: { req: FastifyRequest }) => {
              // For a standard HTTP request, the `req` object is passed here.
              // Your @GqlAuthGuard will use this to extract the user from the JWT.
              return { req };
            },

            playground: configService.get('NODE_ENV') !== 'production',
          }),
        }),
      ],
      providers: [
        { provide: subgraphPublisherOptionsToken, useValue: { serviceName, schemaPath } },
        SubgraphPublisher,
      ],
    };
  }
}
