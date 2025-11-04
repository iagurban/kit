import { declareEventsTopic } from '@gurban/kit/declare-events-topic';
import { retrying } from '@gurban/kit/utils/flow/retrying';
import { readFileSync } from 'fs';
import { z } from 'zod/v4';

import { CacheService } from '../cache/cache.module';
import { Logger } from '../logger/logger.module';
import { PubSubPublisherService } from '../pubsub/pubsub-publisher.service';

interface PublishOptions {
  cache: CacheService;
  publisher: PubSubPublisherService;
  logger: Logger;
  serviceName: string;
  schemaPath: string;
  version: number;
}

const gatewayGraphqlUpdatedTopic = declareEventsTopic('gateway:graphql_updated', z.string());

/**
 * Reads a GraphQL schema file, determines its version from the file's last-modified time,
 * and safely publishes it to the Redis Schema Registry using a Lua script.
 */
export const publishGraphqlSubgraph = async (options: PublishOptions): Promise<void> => {
  const { cache, publisher, logger, serviceName, schemaPath } = options;

  return retrying(
    error => {
      logger.error({ error }, `Failed to publish schema for [${serviceName}]`);
      return true;
    },
    async attempt => {
      try {
        logger.debug(`Starting schema publication for [${serviceName}]...`);

        // 1. Get the schema, hash, and version from the local file
        const sdl = readFileSync(schemaPath, 'utf-8');

        const fullSubgraphObject = { name: serviceName, sdl, version: options.version };

        if (
          await cache.publishSchema({
            subgraph: fullSubgraphObject,
            versionsKey: 'gateway:graphql_subgraph_versions',
            subgraphsKey: 'gateway:graphql_subgraphs',
            serviceName,
          })
        ) {
          await publisher.publish(gatewayGraphqlUpdatedTopic, serviceName);
          logger.info(`Successfully published new schema version [${options.version}] for [${serviceName}].`);
        } else {
          logger.debug(`Schema for [${serviceName}] is already up-to-date.`);
        }
      } catch (error) {
        if (attempt > 5) {
          process.exit(1);
        } else {
          throw error;
        }
      }
    }
  );
};
