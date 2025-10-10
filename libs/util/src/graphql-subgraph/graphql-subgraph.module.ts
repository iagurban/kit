import { once } from '@gurban/kit/core/once';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { DynamicModule, Inject, Injectable, Module, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { RedisService } from '@poslah/database/redis/redis.service';
import { RedisScriptManager } from '@poslah/database/redis/redis-script-manager';
import { FastifyRequest } from 'fastify';

import { createContextualLogger, Logger } from '../logger/logger.module';
import { publishGraphqlSubgraph } from './publish-graphql-subgraph';

const subgraphPublisherOptionsToken: unique symbol = Symbol(`SUBGRAPH_PUBLISHER_OPTIONS`);

@Injectable()
class SubgraphPublisher implements OnModuleInit {
  constructor(
    private readonly redis: RedisService,
    private readonly scriptManager: RedisScriptManager,
    private readonly loggerBase: Logger,
    @Inject(subgraphPublisherOptionsToken)
    private readonly options: {
      serviceName: string;
      schemaPath: string;
    }
  ) {}

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, SubgraphPublisher.name);
  }

  async onModuleInit() {
    await publishGraphqlSubgraph({
      redis: this.redis,
      scriptManager: this.scriptManager,
      logger: this.loggerBase,
      serviceName: this.options.serviceName, // The name of this subgraph
      schemaPath: this.options.schemaPath, // Path to its schema file
    });
  }
}

const registerGraphqlSubgraphModule = (schemaPath: string) =>
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
  });

@Module({})
export class GraphqlSubgraphModule {
  static forRoot(serviceName: string, schemaPath: string): DynamicModule {
    return {
      module: GraphqlSubgraphModule,
      imports: [registerGraphqlSubgraphModule(schemaPath)],
      providers: [
        { provide: subgraphPublisherOptionsToken, useValue: { serviceName, schemaPath } },
        SubgraphPublisher,
      ],
    };
  }
}
