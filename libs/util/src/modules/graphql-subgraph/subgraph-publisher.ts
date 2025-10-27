import { once } from '@gurban/kit/core/once';
import { createContextualLogger } from '@gurban/kit/interfaces/logger-interface';
import { ServiceInfo } from '@gurban/kit/nest/service-info';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';

import { Logger } from '../logger/logger.module';
import { RedisService } from '../nosql/redis/redis.service';
import { RedisScriptManager } from '../nosql/redis/redis-script-manager';
import { publishGraphqlSubgraph } from './publish-graphql-subgraph';

export const subgraphPublisherOptionsToken: unique symbol = Symbol(`SUBGRAPH_PUBLISHER_OPTIONS`);

export type SubgraphPublisherOptions = {
  schemaPath: string;
  version: number;
};

@Injectable()
export class SubgraphPublisher implements OnModuleInit {
  constructor(
    private readonly redis: RedisService,
    private readonly scriptManager: RedisScriptManager,
    private readonly loggerBase: Logger,

    @Inject(subgraphPublisherOptionsToken)
    private readonly options: SubgraphPublisherOptions,

    private readonly serviceInfo: ServiceInfo
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
      serviceName: this.serviceInfo.shortName, // The name of this subgraph
      schemaPath: this.options.schemaPath, // Path to its schema file
      version: this.options.version,
    });
  }
}
