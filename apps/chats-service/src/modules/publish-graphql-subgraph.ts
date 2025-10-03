import { RedisScriptManager } from '@poslah/database/redis/redis-script-manager';
import { Logger } from '@poslah/util/logger/logger.module';
import { retrying } from '@poslah/util/retrying';
import { createHash } from 'crypto';
import { readFileSync, statSync } from 'fs';
import { Redis } from 'ioredis';

interface PublishOptions {
  redis: Redis;
  scriptManager: RedisScriptManager;
  logger: Logger;
  serviceName: string;
  schemaPath: string;
}

/**
 * Reads a GraphQL schema file, determines its version from the file's last-modified time,
 * calculates its checksum, and safely publishes it to the Redis Schema Registry using a Lua script.
 */
export const publishGraphqlSubgraph = async (options: PublishOptions): Promise<void> => {
  const { redis, scriptManager, logger, serviceName, schemaPath } = options;

  return retrying(
    error => {
      logger.error({ error }, `❌ Failed to publish schema for [${serviceName}]`);
      return true;
    },
    async attempt => {
      try {
        logger.info(`Starting schema publication for [${serviceName}]...`);

        // 1. Get the schema, hash, and version from the local file
        const sdl = readFileSync(schemaPath, 'utf-8');
        const schemaHash = createHash('sha256').update(sdl).digest('hex');
        const version = statSync(schemaPath).mtime.toISOString();

        const fullSubgraphObject = {
          name: serviceName,
          sdl,
          version,
        };

        // 2. Define keys and args for the Lua script
        const keys = [
          'gateway:graphql_subgraph_versions',
          'gateway:graphql_subgraph_hashes',
          'gateway:graphql_subgraphs',
        ];
        const argv = [serviceName, version, schemaHash, JSON.stringify(fullSubgraphObject)];

        // 3. Execute the script using EVALSHA for performance
        const result = await redis.evalsha(
          scriptManager.getSha('publishSchema'),
          keys.length,
          ...keys,
          ...argv
        );

        // 4. If the script returned 1, it means we updated the schema, so we publish a notification
        if (result === 1) {
          await redis.publish('gateway:graphql_updated', serviceName);
          logger.info(`✅ Successfully published new schema version [${version}] for [${serviceName}].`);
        } else {
          logger.info(`Schema for [${serviceName}] is already up-to-date.`);
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
