import { once } from '@gurban/kit/core/once';
import { createContextualLogger } from '@gurban/kit/interfaces/logger-interface';
import { ServiceInfo } from '@gurban/kit/nest/service-info';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';

import { CacheService } from '../cache/cache.module';
import { Logger } from '../logger/logger.module';
import { PubSubPublisherService } from '../pubsub/pubsub-publisher.service';
import { publishGraphqlSubgraph } from './publish-graphql-subgraph';

export const subgraphPublisherOptionsToken: unique symbol = Symbol(`SUBGRAPH_PUBLISHER_OPTIONS`);

export type SubgraphPublisherOptions = {
  schemaPath: string;
  version: number;
};

@Injectable()
export class SubgraphPublisher implements OnModuleInit {
  constructor(
    private readonly cache: CacheService,
    private readonly publisher: PubSubPublisherService,
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
      cache: this.cache,
      publisher: this.publisher,
      logger: this.loggerBase,
      serviceName: this.serviceInfo.shortName, // The name of this subgraph
      schemaPath: this.options.schemaPath, // Path to its schema file
      version: this.options.version,
    });
  }
}
