import { once } from '@gurban/kit/core/once';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { RedisService } from '@poslah/database/redis/redis.service';
import { RedisScriptManager } from '@poslah/database/redis/redis-script-manager';

import { createContextualLogger, Logger } from '../logger/logger.module';
import { publishGraphqlSubgraph } from './publish-graphql-subgraph';

export const subgraphPublisherOptionsToken: unique symbol = Symbol(`SUBGRAPH_PUBLISHER_OPTIONS`);

export type SubgraphPublisherOptions = {
  serviceName: string;
  schemaPath: string;
};

@Injectable()
export class SubgraphPublisher implements OnModuleInit {
  constructor(
    private readonly redis: RedisService,
    private readonly scriptManager: RedisScriptManager,
    private readonly loggerBase: Logger,

    @Inject(subgraphPublisherOptionsToken)
    private readonly options: SubgraphPublisherOptions
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
